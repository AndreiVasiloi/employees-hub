# Step 5: Draft Security, Scalability, Deployment, and Monitoring

Generate the operational and non-functional sections.

```
HLD: Security + Scalability + Deployment + Monitoring

## Security Considerations
- Authentication: [Mechanism and access model]
- Authorization: [RBAC/ABAC, permission matrix reference]
- Data Encryption: [At rest and in transit]
- Compliance: [Regulatory frameworks, non-negotiables]
- Auditability: [Logging requirements, immutability, retention]
- Breach Notification: [Obligations and timelines]
- Data Retention: [Periods by data type, purge mechanisms]

## Scalability & Performance
Expected Load: [Users, requests, data volume]
Scaling Strategy: [Statelessness, isolation, persistence approach]

## Deployment Architecture
Environments: [Dev, Staging, Production — purposes]
Deployment Strategy: [Strategy or TBD]
Current posture: [Constraints and exclusions]

## Monitoring & Observability
- Logging: [Events, state transitions, format, protection]
- Metrics: [What to track]
- Tracing: [End-to-end requirements]
- Alerting: [What triggers alerts]
- Audit Access: [Who can access, access logging]

⚙️ Architecture rules enforced:
- [✓/✗] All state transitions logged with timestamp, actor, and trigger
- [✓/✗] Corrections create immutable superseding runs, not mutations
- [✓/✗] Human flows modeled as core flows, not side-processes

How would you like to proceed?
- Correct — proceed to open questions and finalization
- Adjust — tell me which section and what to change
- Add requirements — I have additional security/operational constraints
```

**STOP**: Wait for architect to validate operational sections.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
