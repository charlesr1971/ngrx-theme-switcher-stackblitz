// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  maxTitleInputLength: 50,
  maxContentInputLength: 215,
  useRestApi: true,
  restApiURLReWrite: false,
  //apiEndpointUrl: 'http://localhost:8500/react/react-router-es6/assets/cfm/rest/api/v1/index.cfm'
  apiEndpointUrl: 'https://community.establishmindfulness.com/assets-react_es6_restapi/cfm/rest/api/v1/index.cfm'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
