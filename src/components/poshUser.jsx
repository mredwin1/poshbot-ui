import React, { Component } from 'react';

class PoshUser extends Component {
  state = {};

  handleImgClick = (url) => {
    window.open(url);
  };

  render() {
    const {
      email,
      firstName,
      lastName,
      id,
      password,
      profilePictureUrl,
      sales,
      username,
      phoneNumber,
      campaignStatus,
      onDelete,
    } = this.props;
    const poshUserClosetUrl = `https://poshmark.com/closet/${username}`;

    return (
      <div className="col-3 mb-3">
        <div className="card">
          <img
            src={profilePictureUrl}
            alt=""
            className="card-img-top pe-auto"
            style={{ cursor: 'pointer' }}
            onClick={() => this.handleImgClick(poshUserClosetUrl)}
          />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">
                {firstName} {lastName}
              </h5>
              <i
                className="bi bi-trash"
                style={{ cursor: 'pointer' }}
                onClick={() => onDelete(id)}
              ></i>
            </div>
            <div>
              <b>Email:</b> {email}
            </div>
            <div>
              <b>Username:</b> {username}
            </div>
            <div>
              <b>Password:</b> {password}
            </div>
            <div>
              <b>Phone Number:</b> {phoneNumber}
            </div>
            <div>
              <b>Status:</b> {campaignStatus}
            </div>
            <div>
              <b>Sales:</b> {sales}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PoshUser;
