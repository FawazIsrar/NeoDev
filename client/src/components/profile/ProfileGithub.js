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
      return null;
    }

    return (
      <div className="glass-card rounded-xl p-md transition-all duration-300 hover:border-white/20">
        <div className="flex items-center gap-xs mb-lg">
          <i className="fab fa-github text-on-surface text-[24px]"></i>
          <h2 className="font-sans text-card-title text-on-surface">Github Repos</h2>
        </div>
        
        {repos === null ? (
          <Spinner />
        ) : reposError ? (
          <h4 className="text-error font-sans text-body-sm bg-error/10 border border-error/20 p-3 rounded-lg">Could not fetch Github repos. Please ensure your username is correct (e.g. <strong>FawazIsrar</strong>) and try again later. It's possible the GitHub API rate limit has been reached.</h4>
        ) : repos.length === 0 ? (
          <h4 className="text-on-surface-variant font-sans text-body-sm">No Github repos found</h4>
        ) : (
          <div className="flex flex-col gap-sm">
            {repos.slice(0, 5).map(repo => (
              <div key={repo.id} className="bg-surface-container-low border border-white/5 p-4 rounded-lg hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans text-body text-primary font-semibold truncate group-hover:text-primary-fixed-dim transition-colors mb-1">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {repo.name}
                      </a>
                    </h4>
                    <p className="font-sans text-body-sm text-on-surface-variant text-sm line-clamp-2">{repo.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="inline-flex items-center gap-1 font-code text-caption text-secondary bg-secondary/10 px-2 py-1 rounded-full border border-secondary/20">
                      <i className="fas fa-star"></i> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1 font-code text-caption text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full border border-white/10">
                      <i className="fas fa-eye"></i> {repo.watchers_count}
                    </span>
                    <span className="inline-flex items-center gap-1 font-code text-caption text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full border border-white/10">
                      <i className="fas fa-code-branch"></i> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
