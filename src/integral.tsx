import React from 'react';
import functionPlot from 'function-plot';
import {evaluate, sin} from 'mathjs';
import * as d3 from 'd3';
import JXGBoard from 'jsxgraph-react-js';

let testOptions = {
    target: '#testPlot',
    xAxis: {domain: [-2, 12]},
    data: [{
        fn: '3 + sin(x)',
        range: [2, 8],
        closed: true
    }]    
}

interface CoverageProps {
    function: string,
    domain: number[],
    range: number[],
    id: string
}

interface RectangleCoverageState {
    fn: string,
    domain: number[],
    options: any
}

class RectangleCoverage extends React.Component<CoverageProps> {
    public state:RectangleCoverageState = {
        fn: this.props.function,
        domain: this.props.domain,
        options: {
            target: '#' + this.props.id,
            skipTip: true,
            xAxis: {domain: this.props.domain},
            yAxis: {domain: this.props.range},
            disableZoom: true,
            data: [{
                fn: this.props.function,
                range: this.props.domain,
                closed: true,
            }]
        },
    }
    // Rects MUST BE a whole, positive number
    // Formula for LRAM
    changeRectNo(rects:number) {
        let newState = Object.assign({}, this.state); 
        newState.options.data = [{
            fn: this.props.function,
            range: this.props.domain,
            closed: true,
        }];
        console.log(newState.options.data);
        let length = this.state.domain[1] - this.state.domain[0];
        let increment = length / rects;
        let currentX;
        let newRect; // this.state.options.data array element
        for (let rect = 0; rect < rects; rect++) {
            currentX = this.state.domain[0] + rect * increment;
            newRect = {
                fn: String(evaluate(this.props.function,{x:currentX})),
                range: [currentX, currentX + increment],
                closed: true,
                color: 'red',
            }
            newState.options.data.push(newRect);
            this.state = newState;
        }
        functionPlot(this.state.options);
    }

    render() {
        return(
            <div>
                <div id={this.props.id}></div>
                <input type = "range" id="rectslider" name = "rect" min = "1" max = "20" step ="1" defaultValue = {1} onChange={(event) => this.changeRectNo(parseFloat(event.target.value))}></input>
            </div>
        )
    }
    componentDidMount() {
        this.changeRectNo(1);
        functionPlot(this.state.options);
    }
}

class D3TestClass extends React.Component {
    render() {
        return(
            <svg height={400} width={400} id="testSVG"></svg>
        )
    }
    componentDidMount() {
        d3.select("#testSVG")
            .append("circle")
            .attr("r", 32)
            .attr("cx", 40)
            .attr("cy", 40)
            .attr("fill", "green");
    }
}

function handmadeRiemann(board: any, method: string,) {
    board.suspendUpdate()
    let rects = 15;
    let leftX = 0;
    let rightX = Math.PI/3;
    let width = rightX - leftX;
    let rectWidth =  width/rects;
    function graphFunc(t:number) {
        return 2 * Math.sin(t) * Math.cos(t);
    }
    let graph =  board.create('functiongraph', [function(t:number) {
                    return graphFunc(t);
    },-10,10])
    for (var i = 0; i < rects; i++) {
        var x = i * rectWidth;
        let p1 = board.create('point', [x,graphFunc(x)], {size: 0, withLabel: false, fixed: true, highlight: false});//top left
        let p2 = board.create('point', [x,-1], {size: 0, withLabel: false, fixed: true, highlight: false}); // Bottom Left
        let p3 = board.create('point', [x+rectWidth, -1], {size: 0, withLabel: false, fixed: true, highlight: false}); // Bottom Right
        let p4 = board.create('point', [x+rectWidth,graphFunc(x)], {size: 0, withLabel: false, fixed: true, highlight: false}); // Top Right
        var pgon = board.create('polygon', [p1,p2,p3,p4], {fillColor:'steelblue', fillOpacity:0.3, fixed: true, highlight: false,
        borders: {
            highlight: false,
        }});
        
        //pgon.borders.setAttribute({
        //    highlight: false,
        //})

    }
    board.unsuspendUpdate();
}

function logicJS(brd: any) {
    brd.suspendUpdate();
    function f(x:number) {
        return sin(x/8 - 11)*10;
    }
    var g = brd.create('functiongraph', [f],{draggable: false, highlight: false,});
    var rectNo =  brd.create('slider', [[-11,9], [-7, 9], [1,1,100]], {name:"Rect. No", snapWidth: 1});
    var os = brd.create('riemannsum',[f,
        function(){return rectNo.Value();}, 
        function(){return "right";},
        function(){return -12;},
        function(){return 12;}
        ],
        {fillColor:'steelblue', fillOpacity:0.3, draggable: false, highlight: false});
    brd.unsuspendUpdate();    
}


// Full Page export component
const Integral = () => {
    return(
        <div>
            <JXGBoard
                logic={handmadeRiemann}
                boardAttributes={{ axis: false, drag: {
                    enabled: false,
                }, boundingbox: [-12, 11, 12, 0], registerEvents: true, }}
                style={{
                    border: "3px solid black",
                    width: "1000px"
                }}
            />
            <D3TestClass></D3TestClass>
        </div>
    )
}
export default Integral;