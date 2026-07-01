import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileExperience from '../ProfileExperience';

describe('ProfileExperience Component', () => {
  const expWithTo = {
    company: 'Tech Corp',
    title: 'Software Engineer',
    from: '2020-01-01',
    to: '2022-01-01',
    description: 'Developed web apps'
  };

  const expCurrent = {
    company: 'Innovate Ltd',
    title: 'Lead Developer',
    from: '2022-02-01',
    current: true
  };

  const expNoDescription = {
    company: 'Startup Inc',
    title: 'Intern',
    from: '2019-06-01',
    to: '2019-08-01'
  };

  test('renders experience with end date', () => {
    render(<ProfileExperience exp={expWithTo} />);
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Position:')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020/01/01')).toBeInTheDocument();
    expect(screen.getByText('2022/01/01')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('Developed web apps')).toBeInTheDocument();
  });

  test('renders experience with current job', () => {
    render(<ProfileExperience exp={expCurrent} />);
    expect(screen.getByText('Innovate Ltd')).toBeInTheDocument();
    expect(screen.getByText('Position:')).toBeInTheDocument();
    expect(screen.getByText('Lead Developer')).toBeInTheDocument();
    expect(screen.getByText('2022/02/01')).toBeInTheDocument();
    expect(screen.getByText('Now')).toBeInTheDocument();
  });

  test('renders experience without description', () => {
    render(<ProfileExperience exp={expNoDescription} />);
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
    expect(screen.getByText('Position:')).toBeInTheDocument();
    expect(screen.getByText('Intern')).toBeInTheDocument();
    expect(screen.getByText('2019/06/01')).toBeInTheDocument();
    expect(screen.getByText('2019/08/01')).toBeInTheDocument();
    expect(screen.queryByText('Description:')).not.toBeInTheDocument();
  });
});
