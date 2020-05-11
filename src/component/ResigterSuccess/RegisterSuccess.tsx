import React, { Component } from 'react';

class  RegisterSuccess extends Component<any,any> {
    render() {
        const userName = this.props.match.params.userName;
        const password = this.props.location.state.response;
        return (       
            <div>
                <div className="page-header">
                    <h1>Register Success!</h1>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">Login Information</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>userName</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userName}</td>
                                    <td>{password}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default  RegisterSuccess;