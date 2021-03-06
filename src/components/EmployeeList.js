import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();
	
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component will be rendered with
		// this.props is still the old set of props

		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.DataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	}

	render() {
		return (
			<ListView 
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProps = state => {
	// state.employees is an object
	// 'val' is the user model: it has name, phone and shift properties on it
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid }; // create a new object, push all the properties, and put the uid on top
		// end result is something like: { shift: 'Monday', name: 'S', id: '12dsa5ds' }
	});

	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
