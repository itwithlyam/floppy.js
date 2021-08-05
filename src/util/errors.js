'use strict';

class TokenError extends Error {
    constructor(reason) {
        super(reason)
    }
}

class IntentsError extends Error {
    constructor(reason) {
        super(reason)
    }
}

class ConnectionError extends Error {
    constructor(reason) {
        super(reason)
    }
}

class PayloadError extends Error {
    constructor(reason) {
        super(reason)
    }
}

class IdentificationError extends Error {
    constructor(reason) {
        super(reason)
    }
}

class RateLimited extends Error {
    constructor(reason) {
        super(reason)
    }
}

class ResumeError extends Error {
    constructor(reason) {
        super(reason)
    }
}

class ShardError extends Error {
    constructor(reason) {
        super(reason)
    }
}

module.exports = {
    TokenError,
    IntentsError,
    ConnectionError,
    PayloadError,
    IdentificationError,
    RateLimited,
    ResumeError,
    ShardError
}
