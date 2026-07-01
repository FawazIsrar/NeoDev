import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layouts/Spinner';

class ProfileGithub extends Component {
  componentDidMount() {
    if (this.props.username) {
      this.props.getGithubRepos(this.props.username);
    }
  }

  render() {
    const { username, repos, reposError } = this.props;

    if (!username) {
      return <h4>No GitHub username provided</h4>;
    }

    return (
      <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos</h2>
        {repos === null ? (
          <Spinner />
        ) : reposError ? (
          <h4>No Github repos found</h4>
        ) : repos.length === 0 ? (
          <h4>No Github repos found</h4>
        ) : (
          repos.slice(0, 5).map(repo => (
            <div key={repo.id} className="repo glass-panel p-1 my-1">
              <h4>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          ))
        )}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array,
  reposError: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  repos: state.profile.repos,
  reposError: state.profile.reposError,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
