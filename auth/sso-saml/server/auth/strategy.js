const SamlStrategy = require('@node-saml/passport-saml').Strategy;
const axios = require('axios');
const xml2js = require('xml2js');

const createKeysCallback = (descriptor) => async (callback) => {
    try {
        const response = await axios.get(descriptor);

        xml2js.parseString(response.data, (err, result) => {
            if (err) {
                callback(new Error('Unable to parse IdP certificate'));
            } else {
                const entityDescriptor = result['md:EntityDescriptor'];
                const idpSsoDescriptor =
                    entityDescriptor['md:IDPSSODescriptor'][0];
                const keyDescriptors = idpSsoDescriptor['md:KeyDescriptor'];
                const keys = keyDescriptors.map(
                    (desc) =>
                        desc['ds:KeyInfo'][0]['ds:X509Data'][0][
                            'ds:X509Certificate'
                        ][0]
                );

                callback(null, keys);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

const setupStrategy = () => {
    return new SamlStrategy(
        {
            entryPoint: process.env.IDP_LOGIN_URL,
            cert: createKeysCallback(process.env.IDP_METADATA_URL),
            issuer: process.env.IDP_ISSUER,
            callbackUrl: process.env.IDP_CALLBACK_URL,

            // --------
            acceptedClockSkewMs: 300000,
            allowCreate: false,
            authnRequestBinding: 'HTTP-Redirect',
            disableRequestedAuthnContext: true,
            identifierFormat:
                'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
            wantAssertionsSigned: false,
            wantAuthnResponseSigned: false
            // logoutCallbackUrl: options.logoutCallbackUrl,
            // logoutUrl: options.logoutUrl,
        },
        (profile, done) => {
            return done(null, profile);
        },
        (profile, done) => {
            return done(null, profile);
        }
    );
};

module.exports = setupStrategy;
