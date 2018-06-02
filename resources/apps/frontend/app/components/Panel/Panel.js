import React from 'react';
import cx from 'classnames';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import AbsoluteLoader from 'components/PageLoader/AbsoluteLoader';

import styles from './Panel.css';

export const Panel = ({ children }) => (
  <Grid container className={styles.panel}>
    <Grid item xs={12}>
      <Paper>{children}</Paper>
    </Grid>
  </Grid>
);

export const PanelActions = ({ children }) => (
  <div className={styles.panelHeader__actions}>{children}</div>
);

export const PanelHeader = ({ title, children }) => (
  <div className={styles.panelHeader}>
    <Typography variant="title" color="inherit">
      {title}
    </Typography>
    <PanelActions>{children}</PanelActions>
  </div>
);

export const PanelFooter = ({ children }) => (
  <div className={styles.panelFooter}>{children}</div>
);

export const PanelBody = ({ isLoading = true, children }) => (
  <div className={styles.panelBody}>
    {isLoading ? <AbsoluteLoader /> : children}
  </div>
);

export const PanelSearchWrapper = (props) => (
  <Grid container className={styles.searchWrapper}>
    {props.children}
  </Grid>
);

export const SearchForm = ({
  value = '',
  onChange = Function,
  onSubmit = Function,
  placeholder = 'Search...',
}) => (
  <Grid container className={styles.searchWrapper}>
    <Grid item xs={11} className={styles.searchInputWrapper}>
      <form onSubmit={onSubmit} className={styles.searchInputWrapper}>
        <input
          value={value}
          type="search"
          placeholder={placeholder}
          className={styles.searchField}
          onChange={onChange}
        />
      </form>
    </Grid>
    <Grid item xs={1} onClick={onSubmit} className={styles.searchButtonWrapper}>
      <button type="button" className={styles.searchButton}>
        <SearchIcon />
      </button>
    </Grid>
  </Grid>
);

export const PanelSearchContainer = (props) => (
  <div className={cx(styles.panelHeader, styles.panelHeader__withFilters)}>
    <Grid container>{props.children}</Grid>
  </div>
);

export const PanelFilterContainter = (props) => (
  <div className={cx(styles.panelHeaderFilter)}>{props.children}</div>
);

export const PanelSearch = ({
  value = '',
  onChange = Function,
  onSubmit = Function,
  children = null,
  placeholder = 'Search Users...',
}) => (
  <PanelSearchContainer>
    <Grid item xs={12} md={12}>
      <SearchForm
        value={value}
        onSubmit={onSubmit}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Grid>
    <Grid item md={9}>
      <div className={styles.filters}>{children}</div>
    </Grid>
  </PanelSearchContainer>
);
