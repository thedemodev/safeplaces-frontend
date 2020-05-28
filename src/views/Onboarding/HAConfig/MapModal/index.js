import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import Map from '../Map';

const MapModal = ({ open, openMapModal }) => {
  const node = useRef(null);

  const handleClick = useCallback(
    e => {
      if (node && node.current && !node.current.contains(e.target)) {
        openMapModal(false);
      }
    },
    [node, openMapModal],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  useEffect(() => {
    document.addEventListener('keypress', handleClick);
    return () => document.removeEventListener('keypress', handleClick);
  }, [handleClick]);

  return open ? (
    <div className={styles.modal} ref={node}>
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faTimes}
          className={styles.closeIcon}
          onClick={() => openMapModal(false)}
        />
        <Map />
      </div>
    </div>
  ) : null;
};

export default MapModal;
