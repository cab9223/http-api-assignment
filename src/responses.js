// function to send an object
const respond = (request, response, status, object, type) => {
  // set status code and content type
  response.writeHead(status, { 'Content-Type': type });

  // Then write it to the response.
  if (type === 'text/xml') {
    response.write(object);
  } else {
    response.write(JSON.stringify(object));
  }

  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response, params, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    // responseXML = `${responseXML} <id></id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // json message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send our json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params, acceptedTypes) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    // set error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id 
    responseJSON.id = 'badRequest';
    // return json with a 400 bad request code
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    // responseXML = `${responseXML} <id></id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

// function to show unauthorized error
const unauthorized = (request, response, params, acceptedTypes) => {
  // message to send
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes</message>`;
      responseXML = `${responseXML} <id>unauthorized</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id 
    responseJSON.id = 'unauthorized';
    // return our json with a 401 code
    return respond(request, response, 401, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You have successfully viewed the content.</message>`;
    // responseXML = `${responseXML} <id></id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};


// function to show forbidden error
const forbidden = (request, response, params, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this content.</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 403, responseXML, 'text/xml');
  }
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // return our json with a 403 error code
  return respond(request, response, 403, responseJSON, 'application/json');
};


// function to show internal server error
const internal = (request, response, params, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Internal Server Error. Something went wrong.</message>`;
    responseXML = `${responseXML} <id>internalError</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 500, responseXML, 'text/xml');
  }
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // return our json with a 500 error code
  return respond(request, response, 500, responseJSON, 'application/json');
};


// function to show not implemented error
const notImplemented = (request, response, params, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return our json with a 501 not found error code
  return respond(request, response, 501, responseJSON, 'application/json');
};


// function to show not found error
const notFound = (request, response, params, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you are looking for was not found.</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  return respond(request, response, 404, responseJSON, 'application/json');
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
