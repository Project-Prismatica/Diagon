// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';


import MUIDataTable from "mui-datatables";

import styles from './SessionTable.css';

export default class SessionTable extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 5,
    }
  }

  render() {
    const options = {
      filterType: 'dropdown',
      viewColumns: false,
      selectableRows: false
    };
    const columns = [
     {
      name: "os",
      label: "OS",
      options: {
       customBodyRender: (value) => {
          return (
            <FontAwesomeIcon className={styles.osfont} icon={faWindows} />
          );
       },
       filter: true,
       sort: true,
      }
     },
     {
      name: "internal",
      label: "Internal",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "external",
      label: "External",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "user",
      label: "User",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "system",
      label: "System",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "note",
      label: "Notes",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "last",
      label: "Last",
      options: {
       filter: true,
       sort: false,
      }
     },
    ];
    let rows = this.props.sessions.map((session, index) => {
      return [session.name, session.ip, session.ip, session.user, session.user, session.note, session.last];
    });

    return (
      <div className={styles.sessioncontainer}>
          <MUIDataTable
            title={"Active Sessions"}
            data={rows}
            columns={columns}
            options={options}
            fullWidth
          />
      </div>
    );
  }
}
