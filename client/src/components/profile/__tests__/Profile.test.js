import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../Profile';

// Mock ProfileGithub to avoid Redux and axios issues
jest.mock('../ProfileGithub', () => ({ username }) => (
  username ? <div>Github Repos</div> : null
));

describe('Profile Component', () => {
  const profileWithData = {
    experience: [
      { _id: '1', company: 'Company A', title: 'Dev', from: '2020-01-01', to: '2021-01-01', description: 'Did stuff' },
      { _id: '2', company: 'Company B', title: 'Lead', from: '2021-02-01', current: true }
    ],
    education: [
      { _id: '1', school: 'School A', degree: 'BS', fieldofstudy: 'CS', from: '2015-01-01', to: '2019-01-01' }
    ],
    githubusername: 'testuser'
  };

  const profileWithoutExperience = {
    ...profileWithData,
    experience: []
  };

  const profileWithoutEducation = {
    ...profileWithData,
    education: []
  };

  const profileWithoutGithub = {
    ...profileWithData,
    githubusername: ''
  };

  test('renders fallback text when profile is null', () => {
    render(<Profile profile={null} />);
    expect(screen.getByText(/Profile data is not available/i)).toBeInTheDocument();
  });

  test('renders experience section with data', () => {
    render(<Profile profile={profileWithData} />);
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
    expect(screen.queryByText(/No experience credentials/i)).not.toBeInTheDocument();
  });

  test('renders fallback text when no experience', () => {
    render(<Profile profile={profileWithoutExperience} />);
    expect(screen.getByText(/No experience credentials/i)).toBeInTheDocument();
  });

  test('renders education section with data', () => {
    render(<Profile profile={profileWithData} />);
    expect(screen.getByText('School A')).toBeInTheDocument();
    expect(screen.queryByText(/No education credentials/i)).not.toBeInTheDocument();
  });

  test('renders fallback text when no education', () => {
    render(<Profile profile={profileWithoutEducation} />);
    expect(screen.getByText(/No education credentials/i)).toBeInTheDocument();
  });

  test('renders GitHub section when username is present', () => {
    render(<Profile profile={profileWithData} />);
    expect(screen.getByText('Github Repos')).toBeInTheDocument();
  });

  test('does not render GitHub section when username is missing', () => {
    render(<Profile profile={profileWithoutGithub} />);
    expect(screen.queryByText('Github Repos')).not.toBeInTheDocument();
  });
});
