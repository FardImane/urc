import { Router, Request, Response } from 'express';
import { Session, SessionCallback } from '../model/common';
import { CustomError } from '../model/CustomError';

const router = Router();

function logout(onResult: SessionCallback, onError: ErrorCallback) {
  const token = sessionStorage.getItem('token');

  if (!token) {
      // Handle the case where the token is not available (optional)
      onError({
        message: 'Token not found',
        code: 0,
        name: '',
        INDEX_SIZE_ERR: 1,
        DOMSTRING_SIZE_ERR: 2,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        INVALID_CHARACTER_ERR: 5,
        NO_DATA_ALLOWED_ERR: 6,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INUSE_ATTRIBUTE_ERR: 10,
        INVALID_STATE_ERR: 11,
        SYNTAX_ERR: 12,
        INVALID_MODIFICATION_ERR: 13,
        NAMESPACE_ERR: 14,
        INVALID_ACCESS_ERR: 15,
        VALIDATION_ERR: 16,
        TYPE_MISMATCH_ERR: 17,
        SECURITY_ERR: 18,
        NETWORK_ERR: 19,
        ABORT_ERR: 20,
        URL_MISMATCH_ERR: 21,
        QUOTA_EXCEEDED_ERR: 22,
        TIMEOUT_ERR: 23,
        INVALID_NODE_TYPE_ERR: 24,
        DATA_CLONE_ERR: 25
      });
      return;
  }

  fetch("/api/logout", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the headers
      },
  })
  .then(async (response) => {

    if (response.ok) {
      const session = await response.json() as Session;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('externalId');
        sessionStorage.removeItem('username');
        onResult(session); // No arguments passed to onResult
    } 
})
  .catch((error) => {
      // Handle network errors or other exceptions
      onError({
        message: 'Error during logout',
        code: 0,
        name: '',
        INDEX_SIZE_ERR: 1,
        DOMSTRING_SIZE_ERR: 2,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        INVALID_CHARACTER_ERR: 5,
        NO_DATA_ALLOWED_ERR: 6,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INUSE_ATTRIBUTE_ERR: 10,
        INVALID_STATE_ERR: 11,
        SYNTAX_ERR: 12,
        INVALID_MODIFICATION_ERR: 13,
        NAMESPACE_ERR: 14,
        INVALID_ACCESS_ERR: 15,
        VALIDATION_ERR: 16,
        TYPE_MISMATCH_ERR: 17,
        SECURITY_ERR: 18,
        NETWORK_ERR: 19,
        ABORT_ERR: 20,
        URL_MISMATCH_ERR: 21,
        QUOTA_EXCEEDED_ERR: 22,
        TIMEOUT_ERR: 23,
        INVALID_NODE_TYPE_ERR: 24,
        DATA_CLONE_ERR: 25
      });
  });
}

export default logout;

