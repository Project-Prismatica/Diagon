// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import downloadFile from '../renderers/download-file';

import MUIDataTable from "mui-datatables";

const remote = require('electron').remote;

import styles from './SessionTable.css';

export default class LootTable extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      cellSelected: {},
    }
    this.downloadLoot = this.downloadLoot.bind(this);
  }
  downloadLoot() {
    console.log("Downloading...")
    console.log(this.props.loot[this.state.cellSelected.rowIndex].name)

    var filename = "tmp.jpg"
    var url = "http://127.0.0.1:29001/api/dl/" + this.props.loot[this.state.cellSelected.rowIndex].name
    //console.log(this.props.settings.homedir)
    //Configure homedir settings to allow for moving of engagement directory in the future
    downloadFile(url, this.props.settings.homedir)
  }



  render() {
    const options = {
      filterType: 'dropdown',
      viewColumns: false,
      selectableRows: false,
      onCellClick: (colData: any, cellMeta: {
        colIndex: number,
        rowIndex: number,
        dataIndex: number
      }) => this.setState({cellSelected: cellMeta})
    };
    const columns = [
     {
      name: "type",
      label: "Type",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "details",
      label: "Details",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "download",
      label: " ",
      options: {
       customBodyRender: (value) => {
          return (
            <div className={styles.dlbtn}>
              <FontAwesomeIcon className={styles.osfont} icon={faDownload} onClick={this.downloadLoot} />
            </div>
          );
       },
      }
     },
    ];
    let rows = []
    try {
      rows = this.props.loot.map((loot, index) => {
        return ["File Download", loot.name, ""];
      });
    } catch (e) {
      rows = []
    }


    return (
      <div className={styles.sessioncontainer}>
          <MUIDataTable
            title={"Engagement Loot"}
            data={rows}
            columns={columns}
            options={options}
            fullWidth
          />
      </div>
    );
  }
}
