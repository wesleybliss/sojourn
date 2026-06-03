import { describe, expect, test } from 'vitest'
import { timestampSeconds, ts, timestamps, lower, table, updateTimestampTrigger, optsCascadeAll } from '../src/db/dbUtils'
import dayjs from 'dayjs'

describe('timestampSeconds', () => {