# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the project maintainer. All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

When reporting a vulnerability, please include:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### Response Timeline

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide a more detailed response within 7 days indicating the next steps
- We will notify you when the vulnerability has been fixed

### Disclosure Policy

- We follow a coordinated disclosure policy
- Once a fix is available, we will release it as soon as possible
- We will credit security researchers who report valid vulnerabilities (unless they prefer to remain anonymous)

## Security Best Practices

When using this library:

1. Always use the latest version
2. Review the release notes for security updates
3. Follow React security best practices
4. Sanitize user inputs when using hooks that handle external data
5. Be cautious with hooks that interact with localStorage or external APIs

## Dependencies

This project uses TypeScript and React as dependencies. We monitor security advisories for these dependencies and update them promptly when security issues are discovered.
