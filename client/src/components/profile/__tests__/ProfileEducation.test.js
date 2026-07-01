import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileEducation from '../ProfileEducation';

describe('ProfileEducation Component', () => {
  const eduWithAll = {
    school: 'University of Tech',
    degree: 'Bachelor of Science',
    fieldofstudy: 'Computer Science',
    from: '2015-09-01',
    to: '2019-05-01',
    description: 'Graduated with honors'
  };

  const eduCurrent = {
    school: 'Online Academy',
    degree: 'Master of Arts',
    fieldofstudy: 'Data Science',
    from: '2020-01-01',
    current: true
  };

  const eduMinimal = {
    school: 'High School',
    from: '2010-09-01',
    to: '2014-06-01'
  };

  test('renders education with all fields', () => {
    render(<ProfileEducation edu={eduWithAll} />);
    expect(screen.getByText('University of Tech')).toBeInTheDocument();
    expect(screen.getByText('Degree:')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science')).toBeInTheDocument();
    expect(screen.getByText('Field of Study:')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2015/09/01')).toBeInTheDocument();
    expect(screen.getByText('2019/05/01')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('Graduated with honors')).toBeInTheDocument();
  });

  test('renders education with current study', () => {
    render(<ProfileEducation edu={eduCurrent} />);
    expect(screen.getByText('Online Academy')).toBeInTheDocument();
    expect(screen.getByText('Degree:')).toBeInTheDocument();
    expect(screen.getByText('Master of Arts')).toBeInTheDocument();
    expect(screen.getByText('Field of Study:')).toBeInTheDocument();
    expect(screen.getByText('Data Science')).toBeInTheDocument();
    expect(screen.getByText('2020/01/01')).toBeInTheDocument();
    expect(screen.getByText('Now')).toBeInTheDocument();
  });

  test('renders education with minimal fields', () => {
    render(<ProfileEducation edu={eduMinimal} />);
    expect(screen.getByText('High School')).toBeInTheDocument();
    expect(screen.getByText('2010/09/01')).toBeInTheDocument();
    expect(screen.getByText('2014/06/01')).toBeInTheDocument();
    expect(screen.queryByText('Degree:')).not.toBeInTheDocument();
    expect(screen.queryByText('Field of Study:')).not.toBeInTheDocument();
    expect(screen.queryByText('Description:')).not.toBeInTheDocument();
  });
});
