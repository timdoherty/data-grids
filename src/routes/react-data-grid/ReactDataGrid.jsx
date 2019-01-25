import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Data } from 'react-data-grid-addons';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { Icon } from '@procore/core-react';

import data from '../../mocks/MOCK_DATA.js';

const defaultColumnProperties = {
  width: 160,
};

const columns = [
  {
    key: 'id',
    name: 'ID',
  },
  {
    key: 'first_name',
    name: 'First Name',
  },
  {
    key: 'last_name',
    name: 'Last Name',
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'phone',
    name: 'Phone #',
  },
  {
    key: 'car_make',
    name: 'Car Make',
  },
  {
    key: 'car_model',
    name: 'Car Model',
  },
  {
    key: 'car_year',
    name: 'Car Year',
  },
  {
    key: 'car_color',
    name: 'Car Color',
  },
  {
    key: 'country',
    name: 'Country',
  },
  {
    key: 'date',
    name: 'Date',
  },
  {
    key: 'username',
    name: 'Username',
  },
  {
    key: 'description',
    name: 'Description',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
  {
    key: 'buzzword',
    name: 'Buzzword',
  },
  {
    key: 'boolean',
    name: 'Boolean',
  },
].map(c => ({ ...c, ...defaultColumnProperties }));

class ReactDataGridDemo extends Component {
  constructor() {
    super();
    this.state = {
      rows: data.filter((datum, idx) => idx < 500),
      groupBy: [columns[5]], //car make
      expandedRows: {},
    };
  }

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[columnGroupName] = Object.assign(
      {},
      expandedRows[columnGroupName]
    );
    expandedRows[columnGroupName][name] = { isExpanded: shouldExpand };
    this.setState({ expandedRows: expandedRows });
  };

  onGroupByChanged = event => {
    console.log(event.target.value);
    this.setState({
      groupBy: columns.filter(column =>
        event.target.value.includes(column.key)
      ),
    });
  };

  render() {
    const { rows, groupBy } = this.state;
    const groupedRows = Data.Selectors.getRows(this.state);
    console.log({ groupedRows });

    function rowGroupRenderer(props) {
      const {
        treeDepth = 0,
        height,
        rowRef,
        onRowExpandClick,
        isExpanded,
        columnGroupDisplayName,
        name,
      } = props;
      const marginLeft = treeDepth * 20;
      const style = {
        height,
        border: '1px solid #dddddd',
        paddingTop: '15px',
        paddingLeft: '5px',
      };

      return (
        <div style={style} tabIndex={0} ref={rowRef}>
          <Icon
            icon={isExpanded ? 'chevron-down' : 'chevron-right'}
            clickable
            style={{ float: 'left', marginLeft, cursor: 'pointer' }}
            onClick={onRowExpandClick}
            size="sm"
          />
          <strong>
            {columnGroupDisplayName}: {name}
          </strong>
        </div>
      );
    }

    return (
      <div>
        <Select
          multiple
          value={this.state.groupBy.map(group => group.key)}
          onChange={this.onGroupByChanged}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
        >
          {columns.map(column => (
            <MenuItem key={column.name} value={column.key}>
              <Checkbox
                checked={this.state.groupBy
                  .map(group => group.key)
                  .includes(column.key)}
              />
              <ListItemText primary={column.name} />
            </MenuItem>
          ))}
        </Select>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => groupedRows[i]}
          rowsCount={groupedRows.length}
          minHeight={650}
          enableCellAutoFocus={false}
          onRowExpandToggle={this.onRowExpandToggle}
          overScan={{ rowsStart: 25, rowsEnd: 25 }}
          rowGroupRenderer={rowGroupRenderer}
        />
      </div>
    );
  }
}

export default ReactDataGridDemo;
