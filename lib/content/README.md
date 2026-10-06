# SAGE Content Access Layer (`lib/content`)

`lib/content/` provides the single access layer over raw data files in `data/*.ts`.

## ⚠️ Architectural Rule: Never Import `data/*.ts` Directly in Pages

Pages, views, and presentational components must **never** import `data/*.ts` directly. All content retrieval must be performed through the accessor functions provided by `lib/content`.

### Why this rule is strictly enforced:

1. **Security & Field Sanitization**:
   Raw data may contain internal or unreleased data. For example, `getCourses()` strips `price` and `currency` before returning data so that no pricing information reaches public-facing pages. Direct imports would bypass this protection.

2. **Dynamically Derived Fields at Read Time**:
   Event status (`upcoming` vs `past`) is strictly computed at read time using day-granularity comparison in a fixed timezone (`UTC`). Status is **never stored** in raw data files. Changing an event's date automatically updates its status without needing manual status edits.

3. **Consistency & Safe Date Handling**:
   Directly comparing timestamps or dates on components can introduce off-by-one errors and time-of-day flipping. `lib/content` guarantees deterministic day-granularity evaluation.

4. **Decoupling Storage from Presentation**:
   If the backing data store changes (e.g., migrating to a CMS or database), only the accessors in `lib/content` need to change, keeping pages and views untouched.

---

## Available API

Import functions and types from `lib/content`:

```typescript
import {
  getEvents,
  getUpcomingEvents,
  getPastEvents,
  getServices,
  getCourses,
} from 'lib/content';
```

### Functions

- `getEvents(): SageEvent[]`
  Returns all events with their `status` ('upcoming' | 'past') derived dynamically at read time.
- `getUpcomingEvents(): SageEvent[]`
  Returns events where `date >= today` in a fixed timezone, sorted ascending by date (earliest first).
- `getPastEvents(): SageEvent[]`
  Returns events where `date < today` in a fixed timezone, sorted descending by date (most recent first).
- `getServices(): Service[]`
  Returns service definitions from the content repository.
- `getCourses(): Course[]`
  Returns all courses with `price` and `currency` stripped.

### Types Exported

- `SageEvent`: Event model including the dynamically derived `status: 'upcoming' | 'past'`.
- `EventStatus`: `'upcoming' | 'past'`.
- `Service`: Service item model.
- `Course`: Sanitized course model (omitting `price` and `currency`).
