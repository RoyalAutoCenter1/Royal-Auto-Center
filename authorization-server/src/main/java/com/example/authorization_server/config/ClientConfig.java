package com.example.authorization_server.config;

import java.time.Duration;
import java.util.Arrays;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;

import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;

import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;

@Configuration
public class ClientConfig {

    // Listas separadas por comas. En Railway, sobreescribir con la URL
    // publica del frontend (ej: https://tu-frontend.up.railway.app/callback).
    @Value("${REACT_CLIENT_REDIRECT_URIS:http://localhost:8090/callback,http://localhost:5173/callback}")
    private String reactClientRedirectUris;

    @Value("${REACT_CLIENT_POST_LOGOUT_REDIRECT_URIS:http://localhost:8090,http://localhost:5173}")
    private String reactClientPostLogoutRedirectUris;

    @Bean
    public RegisteredClientRepository registeredClientRepository() {

        // 1. CLIENTE DE ANGULAR (Lo regresamos al puerto 4200)
        RegisteredClient angularClient =
                RegisteredClient.withId(UUID.randomUUID().toString())
                        .clientId("angular-client")
                        .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
                        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                        .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                        .redirectUri("http://localhost:4200/login/oauth2/code/angular-client")
                        .postLogoutRedirectUri("http://localhost:4200")
                        .scope(OidcScopes.OPENID)
                        .scope(OidcScopes.PROFILE)
                        .scope("read")
                        .scope("write")
                        .clientSettings(
                                ClientSettings.builder()
                                        .requireAuthorizationConsent(false)
                                        .requireProofKey(true)
                                        .build()
                        )
                        .tokenSettings(
                                TokenSettings.builder()
                                        .accessTokenTimeToLive(Duration.ofMinutes(30))
                                        .refreshTokenTimeToLive(Duration.ofDays(1))
                                        .reuseRefreshTokens(false)
                                        .build()
                        )
                        .build();

        // 2. NUEVO CLIENTE DE REACT (Puerto 5173)
        RegisteredClient reactClient =
                RegisteredClient.withId(UUID.randomUUID().toString())
                        .clientId("react-client") // Debe coincidir con tu app en React
                        .clientAuthenticationMethod(ClientAuthenticationMethod.NONE) // Habilita PKCE
                        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                        .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                        .redirectUris(uris -> uris.addAll(Arrays.asList(reactClientRedirectUris.split(","))))
                        .postLogoutRedirectUris(uris -> uris.addAll(Arrays.asList(reactClientPostLogoutRedirectUris.split(","))))
                        .scope(OidcScopes.OPENID)
                        .scope("read")
                        .clientSettings(
                                ClientSettings.builder()
                                        .requireAuthorizationConsent(false)
                                        .requireProofKey(true) // Exige PKCE (code_challenge)
                                        .build()
                        )
                        .tokenSettings(
                                TokenSettings.builder()
                                        .accessTokenTimeToLive(Duration.ofMinutes(30))
                                        .refreshTokenTimeToLive(Duration.ofDays(1))
                                        .reuseRefreshTokens(false)
                                        .build()
                        )
                        .build();

        return new InMemoryRegisteredClientRepository(angularClient, reactClient);
    }
}