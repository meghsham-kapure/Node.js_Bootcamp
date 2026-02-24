# YAML Crash Course

## What is Crash Course

- is a data serialization format means translation of data structure or object state into a format that can be stored or transmitted like XML or JSON
- YAML is primarily used for writing configuration files, CI/CD pipelines, and data exchange
- YAML is not as verbose as JSON or XML and needs fewer characters to describe its properties
- YAML files support the extensions `.yml` and `.yaml`

## YAML structure

- YAML keys and values are mostly written in `snake_case` but `kebab-case` and `camelCase` are also valid.

* YAML does support whitespace after the colon, and it is required: `key: value` and there must be a 1 space after colon.

- Inline comments start with a hash, e.g. `# I am an inline comment`. YAML does not have official multi-line comment syntax — each line must start with `#`.
- Every new key is written on a new line with indentation and followed by its value, with a colon between them: `key_identifier: value_of_the_key`
- Using 2-space indentation is standard in YAML and tabs are not allowed.
- YAML is indentation-sensitive, Incorrect indentation will break the structure and cause errors.
- YAML supports lists using dashes where one has multiple values :

  ```yaml
  fruits:
    - apple
    - banana
    - mango
  ```

- YAML supports nested objects:

  ```yaml
  database:
    host: localhost
    port: 5432
  ```

## Data types in YAML

1. String :
   - Strings are case sensitive.
   - Strings can be written as plain text (unquoted) if they do not contain special characters. They may include spaces. If the string contains special symbols (`:`, `#`, `{}`, `[]`, etc.) or could be misinterpreted (like `true`, `false`, `null`, numbers), it should be enclosed in single or double quotes. (Everything wrapped in quotes is string enen its valied value in other datatype '1', 'true')
   - Strings do not need to use dashes or underscores specifically — those are naming conventions, not string rules.
   - For multi-line strings, use `|` (literal block, preserves line breaks) or `>` (folded block, converts line breaks into spaces). Indentation must be respected.

   ```yaml
   message_one: |
     HI
     my name
     is John Snow

   message_two: >
     HI
     my name
     is Daenerys Targaryen
   ```

2. Number :
   - Numeric values are written directly without quotes.
   - YAML supports different number bases (binary, octal, hexadecimal, decimal).
   - If a number is written in quotes, it will be treated as a string, not a number.
   - YAML supports negative numbers, floating-point numbers and exponential notation.
   - YAML allows underscores in numbers for readability (YAML 1.2).

   ```yaml
   binary_number: 0b1010
   octal_number: 0o12
   hexadecimal_number: 0xA
   decimal_number: 10

   negative_number: -42
   float_number: 3.14
   exponential_number: 1.2e3
   readable_number: 1_000_000
   ```

   - Special numeric values are also supported:

   ```yaml
   infinity: .inf
   negative_infinity: -.inf
   not_a_number: .nan
   ```

3. Boolean :
   - YAML's valid boolean values are `true` or `false`
   - Older YAML versions (1.1) also allowed values like `yes`, `no`, `on`, `off`, but this is not recommended in YAML 1.2.
   - Boolean values are case-insensitive (`True`, `FALSE` are valid but not recommended).
   - If written in quotes, they are treated as strings, not booleans.

   ```yaml
   is_active: true
   is_admin: false

   # also valid (not recommended style)
   is_enabled: True
   is_disabled: FALSE
   ```

4. Null :
   - Null represents an empty or non-existent value and represented by `null` or `~` (shorthand)
   - An empty / no value after a key is treated as null.

   ```yaml
   value_one: null
   value_two: ~
   value_three:
   ```

5. Timestamp :
   - YAML supports date and date-time values following ISO 8601 format.
   - Timestamps are written directly (without quotes) to be treated as date/time values.
   - They can represent only a date, or a full date-time with timezone.
   - Timezone can be specified using `Z` (UTC) or an offset like `+05:30`.

   ```yaml
   date_only: 2026-02-23 # YYYY-MM-DD
   date_time_utc: 2026-02-23T10:15:30Z # YYYY-MM-DDThh:mm:ssZ (T is the separator, Z means UTC/Zulu time)
   date_time_offset: 2026-02-23T15:45:00+05:30 # YYYY-MM-DDThh:mm:ss+hh:mm
   date_time_space_format: 2026-02-23 10:15:30 # YYYY-MM-DD hh:mm:ss
   ```

6. Array (List / Sequence) :
   - Arrays in YAML are called sequences.
   - They are written using dashes `-` (block style) or square brackets `[]` (flow style).
   - Each item must be properly indented.
   - Arrays can contain mixed data types (strings, numbers, booleans, objects, etc.).
   - Arrays can also contain nested objects or other arrays.

   ```yaml
   # Block style (recommended)
   fruits:
     - apple
     - banana
     - mango
   ```

   ```yaml
   # Flow style (inline)
   numbers: [1, 2, 3, 4]
   ```

   ```yaml
   # Mixed data types
   mixed_values:
     - 10
     - true
     - 'hello'
     - null
   ```

   ```yaml
   # Array of objects
   users:
     - name: John
       age: 25
     - name: Daenerys
       age: 22
   ```

   ```yaml
   # Nested arrays
   matrix:
     - [1, 2, 3]
     - [4, 5, 6]
   ```

7. Nested List (List inside a List) :
   - A nested list is a sequence that contains another sequence as its item.
   - Proper indentation is required.
   - It can be written in block style or flow style.

   ```yaml
   # Block style nested list
   nested_list:
     - - apple
       - banana
     - - mango
       - orange
   ```

   ```yaml
   # More readable block style
   nested_list:
     - - apple
       - banana
     - - mango
       - orange
   ```

   ```yaml
   # Flow style
   nested_list: [[apple, banana], [mango, orange]]
   ```

   - Nested lists are commonly used for matrices or grouped data.

   ```yaml
   matrix:
     - - 1
       - 2
     - - 3
       - 4
   ```

8. Dictionary (Mapping / Object) :
   - A dictionary in YAML is called a mapping.
   - It is written as `key: value` pairs.
   - Keys must be unique within the same mapping.
   - Proper indentation is required for nested mappings.
   - It can be written in block style or flow style.

   ```yaml
   # Simple dictionary
   user:
     name: John
     age: 25
     is_admin: false
   ```

   ```yaml
   # Nested dictionary
   database:
     host: localhost
     port: 5432
     credentials:
       username: admin
       password: secret
   ```

   ```yaml
   # Flow style (inline dictionary)
   user: { name: John, age: 25, is_admin: false }
   ```

   - Dictionaries can contain other dictionaries, lists, or any YAML data type.

9. Pointers (Anchors & Aliases) :

- YAML supports anchors (`&`)and aliases (`*`) to reuse data.
- An anchor (`&name`) defines a reusable node and works like variable defination
- An alias (`*name`) references that anchored value works like accesing a data.
- This avoids duplication and keeps configuration DRY.
- YAML also supports merge keys (`<<`) to merge mappings.
- If a key is repeated within the same YAML mapping, most parsers use the last defined value, effectively overriding the earlier one — although duplicate keys are technically invalid according to the YAML specification.

```yaml
# Define an anchor
default_settings: &default_config
  host: localhost
  port: 5432
  timeout: 30

# Use alias
development:
  database: *default_config

production:
  database: *default_config
```

```yaml
# Merge key example
base: &base
  retries: 3
  timeout: 60

service_one:
  <<: *base
  url: http://service-one.local

service_two:
  <<: *base
  url: http://service-two.local
```

- Anchors work with mappings, lists, and even single values.
- The alias must reference a previously defined anchor.

### Step 1 — Define an anchor

```yaml
default_config: &base
  retries: 3
  timeout: 60
```

Here, `&base` creates an anchor and The anchor stores the mapping:

```yaml
retries: 3
timeout: 60
```

### Step 2 — Merge it into another mapping

```yaml
service_one:
  <<: *base
  url: http://service-one.local
```

Here, `*base` references the anchor and `<<:` merges its key-value pairs into `service_one`.

## Full Working Example

```yaml
default_config: &base
  retries: 3
  timeout: 60

service_one:
  <<: *base
  url: http://service-one.local

service_two:
  <<: *base
  timeout: 120
  url: http://service-two.local
```

## What YAML Internally Resolves To

After processing merges, it behaves like this:

```yaml
default_config:
  retries: 3
  timeout: 60

service_one:
  retries: 3
  timeout: 60
  url: http://service-one.local

service_two:
  retries: 3
  timeout: 120
  url: http://service-two.local
```

Notice:

- `service_one` inherits everything from `default_config`.
- `service_two` overrides `timeout`.
- The key `default_config` itself is NOT copied inside services.
- Only its inner key-value pairs are merged.

> Rule : `<<: *base`= “Inject the contents of base right here.”

> YAML supports multiline keys and nested keys, but it is generally good practice to avoid complex or deeply nested structures when possible, as they can make the configuration harder to read, maintain, and understand unnecessarily.

10. Explicit Data Conversion (`!!`) :

- YAML allows explicit type declaration using tags with `!!`.
- This forces a value to be interpreted as a specific data type.
- It is useful when automatic type detection might misinterpret a value.
- Common tags include `!!str`, `!!int`, `!!bool`, `!!float`, and `!!null`.
- Explicit typing improves clarity but is rarely needed in normal configurations.

```yaml
string_value: !!str 123
integer_value: !!int '42'
float_value: !!float '3.14'
boolean_value: !!bool 'true'
null_value: !!null ''
```

- Example where explicit typing prevents misinterpretation:

```yaml
zip_code_auto: 00123 # may be treated as number
zip_code_forced: !!str 00123 # forced to remain string
```

11. Set :

- YAML supports sets using the special tag `!!set`.
- A set is an unordered collection of unique values.
- Internally, it is represented as a mapping where each key is a set item and the value is `null`.
- Duplicate values are not allowed.
- Sets are rarely used in common configuration files.
- Canonical syntax uses `?` to declare explicit keys.

```yaml
unique_roles: !!set
  ? admin
  ? editor
  ? viewer
```

- Alternative (also valid in many parsers):

```yaml
unique_roles: !!set
  admin: null
  editor: null
  viewer: null
```

- Flow style example:

```yaml
unique_numbers: !!set { 1, 2, 3 }
```

### Error Nightmare of YAML

YAML is powerful but very strict. Small mistakes can completely break it. Common problems:

- Indentation errors → YAML is indentation-sensitive. Wrong spacing breaks structure. Tabs are not allowed — only spaces.
- Mixing tabs and spaces → Causes parsing failures.
- Missing space after colon → `key:value` ❌ → must be `key: value` ✅
- Wrong nesting level → Incorrect hierarchy due to bad indentation.
- Duplicate keys → Technically invalid (even if some parsers allow it).
- Special characters not quoted → `:`, `#`, `{}`, `[]`, `&`, `*` may need quotes.
- Unintended type conversion → `yes`, `on`, `00123`, `2026-02-23` may be auto-converted.
- Incorrect list formatting → Dash must align properly.
- Anchors used before definition → Alias must reference an existing anchor.

### Why YAML feels scary

- Structure is defined by whitespace.
- Errors often don’t clearly tell you where the mistake is.
- One missing space can break everything.

### Best Practice

- Always use 2 spaces.
- Never use tabs.
- Validate YAML with a linter.
- Keep structure simple and shallow when possible.

YAML is clean… until indentation goes wrong

You’ve already covered most core concepts. Here are a few important things that complete your YAML knowledge:

---

# Extras

### 1. Documents in a Single File

YAML can contain multiple documents separated by ``.

```yaml

name: John

name: Daenerys
```

``starts a new document.`...` can optionally mark the end of a document.

### 2. Flow vs Block Style

Most structures have two styles:

- **Block style** (indented, more readable)
- **Flow style** (JSON-like inline)

Good practice: prefer block style for readability.

### 3. YAML is a Superset of JSON

Valid JSON is valid YAML.

```yaml
{ 'name': 'John', 'age': 25 }
```

This is valid YAML.

### 4. Schema Differences (YAML 1.1 vs 1.2)

Some parsers behave differently:

- YAML 1.1 treats `yes`, `no`, `on`, `off` as booleans.
- YAML 1.2 does not.
- Always know which version your tool uses (Kubernetes, Docker, etc.).

### 5. Strings That Look Like Something Else

Be careful with values that might auto-convert:

- `2026-02-23` → timestamp
- `00123` → number
- `true` → boolean
- `null` → null

If you want them as strings → quote them.

### 6. Multiline String Differences

- `|` preserves line breaks.
- `>` folds line breaks into spaces.

Very common in CI/CD pipelines and Kubernetes manifests.

### 7. YAML is Not a Programming Language

- No loops
- No conditionals
- No variables (anchors are not variables)
- Pure data structure

### 8. Tool-Specific Extensions

Some systems extend YAML:

- Docker Compose
- Kubernetes
- GitHub Actions

They add their own validation rules on top of YAML syntax.

### 9. Keep It Clean

Best practices:

- 2 spaces indentation
- No tabs
- Avoid deep nesting
- Avoid duplicate keys
- Quote ambiguous values
- Validate before committing

If you understand everything you’ve written plus this list, you’re already beyond “beginner YAML” level.
