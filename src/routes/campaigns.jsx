import React, { Component } from 'react';
import HeadingBar from '../components/common/headingBar';
import AddButton from '../components/common/addButton';
import Grid from '../components/common/grid';
import CustomCard from '../components/common/customCard';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import { withRouter } from '../components/common/withRoute';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';
import CampaignBody from './../components/campaignBody';

class Campaign extends Component {
  state = {
    search: '',
    pageSize: 12,
    currentPage: 1,
  };

  constructor() {
    super();
    this.handleAddCampaign = this.handleAddCampaign.bind(this);
  }

  componentDidMount() {
    this.props.loadListings();
    this.props.loadCampaigns();
  }

  handleAddCampaign = () => {
    this.props.navigate('/campaigns/new');
  };

  getCoverPhoto = (campaign) => {
    const listings = [];
    _.map(this.props.listings, (listing) => {
      if (campaign.listings.includes(listing.id)) listings.push(listing);
    });
    if (listings[0]) return listings[0].cover_photo;
    return `${process.env.PUBLIC_URL}/campaign.jpg`;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (id) => {
    this.props.removeCampaign({ id });
  };

  handleSearch = (search) => {
    this.setState({ search, currentPage: 1 });
  };

  render() {
    const { search, pageSize, currentPage } = this.state;
    const { campaigns: allCampaigns } = this.props;
    const filtered = search
      ? _.filter(allCampaigns, (u) => u.title.toLowerCase().includes(search))
      : allCampaigns;
    const campaigns = paginate(filtered, currentPage, pageSize);
    return (
      <React.Fragment>
        <HeadingBar
          searchPlaceholder="Search by Title"
          title={`${filtered.length} Campaigns`}
          onSearch={this.handleSearch}
          children={
            <AddButton
              message="Add Campaign"
              onClick={this.handleAddCampaign}
            />
          }
        />
        <hr className="mt-2" />
        <Grid
          currentPage={currentPage}
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          children={campaigns.map((campaign) => (
            <CustomCard
              key={campaign.id}
              imgSrc={this.getCoverPhoto(campaign)}
              children={
                <CampaignBody {...campaign} onDelete={this.handleDelete} />
              }
            ></CustomCard>
          ))}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  campaigns: state.entities.campaigns.list,
  listings: state.entities.listings.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadCampaigns: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/campaigns/',
        onSuccess: 'campaigns/received',
      })
    );
  },
  removeCampaign: (payload) => {
    dispatch(
      apiCallBegan({
        url: `/campaigns/${payload.id}/`,
        method: 'DELETE',
        onSuccess: 'campaigns/removed',
      })
    );
  },
  loadListings: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/listings/',
        onSuccess: 'listings/received',
      })
    );
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Campaign)
);
