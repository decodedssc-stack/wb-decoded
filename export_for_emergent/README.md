# WB Decoded — Emergent Deployment & Setup Guide

This package contains the complete WB Decoded platform data, schema, and application suite ready for Emergent.

## 📊 Package Contents
- **Total Questions**: 52275
- **Total Mock Tests**: 3150 (Including 1,950 Chapter-Wise Mocks: 10 per chapter × 30 MCQs × 25 Mins)
- **Tables Exported**: 37 tables in individual JSON format
- **SQL Schema & Data Dump**: `wb_decoded_dump.sql`
- **Pre-compressed SQLite Database**: `wb_decoded.sqlite.gz`

## 🚀 Running on Emergent

### Option 1: Automatic (Zero Config)
The repository automatically detects `data/wb_decoded.sqlite.gz` and decompresses it on first launch:
```bash
npm install
npm run dev
```
Visit http://localhost:3005.

### Option 2: Restore from SQL Dump
```bash
sqlite3 data/wb_decoded.sqlite < export_for_emergent/wb_decoded_dump.sql
```

### Option 3: Manual Decompress
```bash
node -e "const fs = require('fs'), zlib = require('zlib'); fs.writeFileSync('data/wb_decoded.sqlite', zlib.gunzipSync(fs.readFileSync('data/wb_decoded.sqlite.gz'))); console.log('Ready!');"
```
