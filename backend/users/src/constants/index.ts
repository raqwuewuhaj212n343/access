export const responses = {
    system: {
        SOCKET_OVERLOAD: "Too many devices currently connected",
        401: "Invalid token",
        403: "Not Authorized to perform this operation",
        409: "Not allowed to perform this action",
        500: "Internal Server Error",
    },

    user: {
        // "By signing in you accept Seaclub Terms of Service: https://zen.land/terms-of-service/" " No password needed!"
        SIGNIN_PREFIX: `Welcome to Seaclub!:\n\nClick \"Sign\" to sign in.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n`,
        INVALID_ADDRESS: "Invalid Wallet Address.",
        HASH_REQURIED: "Hash is required",
        DURATION_REQUIRED: "Duration Required",
        AUTHENTCATION_FAILED: "Could not authenticate",
        NOT_FOUND: "User not found",
        EMAIL_NOT_FOUND: "Please update your profile with a valid email address",
        SUCCESS: "Success",
        PASSWORDS_NOT_MATCH: "Passwords does not match",
        EMAIL_REQUIRED: "Email required",
        EMAIL_VERIFIED: "Email already verified",
        INVALID_EMAIL: "Invalid email address",
        INVALID_PASSWORD: "Password does not meet security standards",
        WRONG_PASSWORD: "Wrong password",
        INVALID_LOGIN_CREDENTIALS: "Invalid email or password provided",
    },
    email: {
        SUCCESS: "Email has been sent successfully",
        FAILURE: "Server Error, please try again later.",
        EXPIRED_OTP:"The OTP has expired.",
        INVALID_OTP:"The OTP given is invalid.",
    },
    template: {
        SUCCESS: "Success",
        NOT_FOUND: "Template not found",
    },
}

export const emails = {
    VERIFY_EMAIL(to: string, otp: number) {
        return {
            to: to,
            from: process.env.PASSWORD_SET_EMAIL || '',
            subject: 'Verify Email',
            // text: 'Add a text here if needed', TO be added later if needed
            html: `OTP: ${otp} - Expires in 5 minutes.`,
        }
    },
    RESET_PASSWORD(to: string, token: string) {
        return {
            to: to,
            from: process.env.PASSWORD_SET_EMAIL || '',
            subject: 'Password reset',
            html: `Reset link: ${process.env.WEBSITE_URI}/reset-password/${token}. Expires in 5 minutes.`,
        }
    }
};

// Regrouping necessary vars for soaicl auth access
export const socialAuth = {
    googleScope: ["email", "profile"],
    facebookScope: ["email", "profile"],
    oauthLinkedinScope: ["r_emailaddress", "r_liteprofile"],
    organizationLinkedinScope: ["r_emailaddress", "r_liteprofile", "rw_organization_admin", "r_organization_social"],
}

// // LINKEDIN OBJECT FOR ORGANIZATION
export const linkedIn = {
    header: {
        ORGANIZATION_APIS_HEADER(access_token: String, version = 202208) { return { 'Authorization': `Bearer ${access_token}`, 'LinkedIn-Version': version, 'X-Restli-Protocol-Version': '2.0.0' } },
    },
    organizationId: "", // TODO from null to string
    vanityName: "", // TODO from null to string
    urls: {
        organizationIdUrl: `https://api.linkedin.com/rest/organizations`,
        vanityNameUrl: `https://api.linkedin.com/rest/organizations?q=vanityName&vanityName=`,
        fetchIndustryById: `https://api.linkedin.com/v2/industries`,
        projection: "projection=(vanityName,primaryOrganizationType,id, description, industries, localizedDescription, staffCountRange, website, localizedWebsite, logoV2)"
    }
};
