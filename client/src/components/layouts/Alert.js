import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    alerts.length > 0 && (
      <div className="fixed top-24 right-4 z-[60] flex flex-col gap-2 w-full max-w-sm px-4 md:px-0">
        {alerts.map(alert => {
          const isError = alert.alertType === 'danger' || alert.alertType === 'error';
          const bgColor = isError ? 'bg-error-container' : 'bg-primary-container';
          const textColor = isError ? 'text-on-error-container' : 'text-on-primary-container';
          const icon = isError ? 'error' : 'check_circle';
          
          return (
            <div 
              key={alert.id} 
              className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border border-white/10 backdrop-blur-md ${bgColor} ${textColor} animate-bounce-in`}
            >
              <span className="material-symbols-outlined">{icon}</span>
              <p className="font-sans text-body-sm font-medium">{alert.msg}</p>
            </div>
          );
        })}
      </div>
    )
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

Alert.defaultProps = {
  alerts: []
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
