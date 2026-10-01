---
title: ReportingAuto
summary: A recipe-driven reporting engine. I set the column rules and analyses once, correlations, crosstabs, outliers, time series, and every report after that runs itself, each output tagged with a run ID so it traces back to the recipe that produced it.
tags: [Python, Pandas, ETL, Data pipelines]
order: 1
cover: /images/projects/reportingauto/ReportingAuto1.png
coverAlt: ReportingAuto analysis recipe builder
gallery:
  - { src: /images/projects/reportingauto/ReportingAuto1.png, caption: 'Analysis recipe builder: configure data, columns, and rules, then run a report' }
  - { src: /images/projects/reportingauto/ReportingAuto2.png, caption: 'Rule setup and advanced analyses: key drivers, outliers, summary stats, time series' }
  - { src: /images/projects/reportingauto/ReportingAuto3.png, caption: 'Generated report with category distributions and correlation insights' }
  - { src: /images/projects/reportingauto/ReportingAuto4.png, caption: 'Crosstab insights exported alongside distribution reports' }
---

## How it works

- Recipe-driven analysis engine: configure column rules, correlations, crosstabs, and advanced analyses (key drivers, outliers, summary stats, time series).
- Runs reports over CSV inputs and emits report and insights outputs tagged with run IDs for traceability.
- Recipes and headers import and export, so reporting is repeatable and shareable.
- Pandas-based ETL, validation, and aggregation logic sits behind each rule.
