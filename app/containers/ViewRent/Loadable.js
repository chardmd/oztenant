/**
 *
 * Asynchronously loads the component for ViewRent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
});
