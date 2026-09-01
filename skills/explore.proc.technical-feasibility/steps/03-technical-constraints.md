# Step 3: Identify Technical Constraints

## Objective

Document limitations that shape design decisions across auth, performance, offline, devices, APIs, security, and legacy systems.

## Entry Criteria

- [ ] Step 2 (Data Realities) complete

## Actions

### 3.1 Authentication and Authorization

- Auth method (SSO, OAuth, SAML)
- Session management, role model, permission granularity
- What we cannot change

### 3.2 Performance Constraints

- Response time requirements (critical, standard, background)
- Throughput requirements (concurrent users, RPS, peak)
- Data volume, network constraints, scalability limits

### 3.3 Offline and Connectivity

- Offline support requirements
- Sync strategy and conflict resolution
- Network reliability expectations

### 3.4 Device and Platform Constraints

- Supported devices (desktop, mobile, tablet)
- Supported browsers and minimum versions
- OS versions, screen sizes, input methods
- Hardware constraints (camera, GPS, sensors)

### 3.5 API and Integration Constraints

- Rate limits, data format, protocol
- Versioning strategy, error handling, retry strategy

### 3.6 Security Constraints

- Encryption (at rest, in transit), compliance requirements
- Audit requirements, access controls

### 3.7 Legacy System Constraints

- Limitations per legacy system
- Impact on UX, workarounds, retirement plans

## Exit Criteria

- [ ] All constraint categories documented
- [ ] Each constraint has rationale and UX impact
- [ ] Legacy system limitations mapped

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.technical-feasibility:0.1.2:2026-08-27T13:34:37Z -->
