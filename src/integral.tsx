import React from 'react';
import functionPlot from 'function-plot';
import {evaluate} from 'mathjs';
import * as d3 from 'd3';

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
                fn: '2',
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
                <input type = "range" id="rectslider" name = "rect" min = "1" max = "30" step ="1" defaultValue = {1} onChange={(event) => this.changeRectNo(parseFloat(event.target.value))}></input>
            </div>
        )
    }
    componentDidMount() {
        this.changeRectNo(5);
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


// Full Page export component
const Integral = () => {
    return(
        <div>
            <RectangleCoverage function={"3+sin(x)"} domain={[0,2*Math.PI]} range={[-1,5]} id="integral1"></RectangleCoverage>
            <D3TestClass></D3TestClass>
        </div>
    )
}
export default Integral;