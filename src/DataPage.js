import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import data from './data.json'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class DataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            rows: [],
            columns: []
        }
    }

    componentWillMount() {
        if (this.props.param == 'number-cases') {
            const { labels, points, rows } = getHighestCountries();
            this.setState({ labels, data: points, rows, columns: columns })
        }
        else if (this.props.param == 'increase-rate') {
            const { labels, points, rows } = getRate(true);
            this.setState({ labels, data: points, rows, columns: columns_rate })
        }
        if (this.props.param == 'stable') {
            const { labels, points, rows } = getRate();
            this.setState({ labels, data: points, rows, columns: columns_rate })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.param == 'number-cases') {
            const { labels, points, rows } = getHighestCountries();
            this.setState({ labels, data: points, rows, columns: columns })
        }
        else if (nextProps.param == 'increase-rate') {
            const { labels, points, rows } = getRate(true);
            this.setState({ labels, data: points, rows, columns: columns_rate })
        }
        if (nextProps.param == 'stable') {
            const { labels, points, rows } = getRate();
            this.setState({ labels, data: points, rows, columns: columns_rate })
        }
    }

    render() {
        const data = {
            datasets: [{
                data: this.state.data,
                backgroundColor: ['pink', 'violet', 'blue', 'red', 'orange', 'green', 'yellow', 'brown', 'purple', 'ebony']
            }],

            labels: this.state.labels
        }

        return <div>
            <Pie data={data} />

            <div style={{ paddingTop: '20px' }}>
                <ReactTable
                    defaultPageSize={10}
                    data={this.state.rows} 
                    columns={this.state.columns}
                />
            </div>
        </div>
    }
}

function getHighestCountries() {
    const cc = {}

    data.forEach(obj => {
        cc[obj.countries_and_territories] = cc[obj.countries_and_territories] ? cc[obj.countries_and_territories] + parseInt(obj.daily_confirmed_cases) : parseInt(obj.daily_confirmed_cases);
    })

    const cc_array = []

    Object.keys(cc).forEach(countries_and_territories => {
        cc_array.push({ countries_and_territories: format(countries_and_territories), cases: cc[countries_and_territories] })
    })

    cc_array.sort((a, b) => b.cases - a.cases)
    const tops = cc_array.splice(0, 10)

    const labels = tops.map(el => el.countries_and_territories)
    const points = tops.map(el => el.cases)

    return { labels, points, rows: tops }
}

function getRate(high) {
    const cc_array = getRates()
    if (high) cc_array.sort((a, b) => b.rate - a.rate)
    else cc_array.sort((a, b) => a.rate - b.rate)

    const tops = cc_array.splice(0, 10)
    const labels = tops.map(el => el.countries_and_territories)
    const points = tops.map(el => el.rate)
    return { labels, points, rows: tops }
}

function getRates() {
    const start = data[0].date
    const end = data[data.length - 1].date
    const cc = {}

    data.forEach(obj => {
        if (obj.date === start) {
            if (cc[obj.countries_and_territories]) {
                cc[obj.countries_and_territories].start = parseInt(obj.confirmed_cases)
            }
            else cc[obj.countries_and_territories] = { start: parseInt(obj.confirmed_cases) }
        }
        else if (obj.date === end) {
            if (cc[obj.countries_and_territories]) {
                cc[obj.countries_and_territories].end = parseInt(obj.confirmed_cases)
            }
            else cc[obj.countries_and_territories] = { end: parseInt(obj.confirmed_cases) }
        }
    })

    const cc_array = []

    Object.keys(cc).forEach(countries_and_territories => {
        const rate = Math.round((cc[countries_and_territories].end / cc[countries_and_territories].start - 1) * 1000) / 1000

        cc_array.push({ countries_and_territories: format(countries_and_territories), rate, start: cc[countries_and_territories].start, end: cc[countries_and_territories].end })
    })

    return cc_array;
}


const columns = [
    {
        Header: 'Country',
        accessor: 'countries_and_territories',
        cellClass: 'text-center',
    },
    {
        Header: 'Cases for data period',
        accessor: 'cases',
        cellClass: 'text-center',
    },
]

const columns_rate = [
    {
        Header: 'Country',
        accessor: 'countries_and_territories',
        cellClass: 'text-center',
    },
    {
        Header: 'Growth rate (%)',
        accessor: 'rate',
        cellClass: 'text-center',
    },
    {
        Header: 'Cases on start date',
        accessor: 'start',
        cellClass: 'text-center',
    },
    {
        Header: 'Cases on end date',
        accessor: 'end',
        cellClass: 'text-center',
    },
]

function format(val) {
    return val.replace(/_/g,' ');
}





