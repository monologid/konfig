const Error = {
  
  // All errors related with database
  DbFailedToConnect: 'Failed to initialize database connection.',
  DbFailedToCloseConnection: 'Failed to close database connection.',

  // All errors related with Application
  AppNameMinLength: 'Application name should be more than 3 characters',
  AppNameIsExist: 'Application name is exist',

  // All errors related with Namespace
  NamespaceNameMinLength: 'Namespace name should be at least 1 character',
  NamespaceAppIdIsMandatory: 'Application ID cannot be undefined'
}

export default Error