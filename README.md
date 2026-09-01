### Hexlet tests and linter status:
[![Actions Status](https://github.com/mikitasazan/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mikitasazan/qa-auto-engineer-javascript-project-87/actions)
[![Node CI](https://github.com/mikitasazan/qa-auto-engineer-javascript-project-87/actions/workflows/check.yml/badge.svg)](https://github.com/mikitasazan/qa-auto-engineer-javascript-project-87/actions)

# Вычислитель отличий (gendiff)

CLI-утилита и библиотека для Node.js, которая сравнивает два конфигурационных
файла (JSON или YAML) и показывает разницу между ними в одном из трёх
форматов: `stylish` (по умолчанию), `plain` или `json`.

## Стек

- Node.js (ESM)
- [commander](https://www.npmjs.com/package/commander) — разбор аргументов
  и опций командной строки
- [js-yaml](https://www.npmjs.com/package/js-yaml) — парсинг YAML-файлов
- [lodash](https://www.npmjs.com/package/lodash) — неизменяемая сортировка
  и объединение ключей при построении дифа
- [Vitest](https://vitest.dev/) + `@vitest/coverage-v8` — тесты и покрытие
- [ESLint](https://eslint.org/) (flat config) — статический анализ кода
- GitHub Actions — CI (линтер, тесты, покрытие), workflow `check.yml`,
  плюс обязательный `hexlet-check.yml`

## Установка

```sh
git clone git@github.com:mikitasazan/qa-auto-engineer-javascript-project-87.git
cd qa-auto-engineer-javascript-project-87
make install
make link   # опционально: делает команду `gendiff` доступной глобально
```

## Использование

Библиотека экспортирует функцию `genDiff` по умолчанию:

```js
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2, formatName); // formatName: 'stylish' | 'plain' | 'json'
console.log(diff);
```

CLI-утилита (после `make link` доступна глобально как `gendiff`, либо
запускается напрямую через `node bin/gendiff.js`):

```sh
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           output usage information
```

Формат `stylish` (по умолчанию), поддерживаются JSON и YAML:

```sh
$ gendiff __fixtures__/file1.json __fixtures__/file2.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

Формат `plain`:

```sh
$ gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

Формат `json`:

```sh
$ gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
[
  {
    "key": "follow",
    "type": "removed",
    "value1": false
  },
  {
    "key": "host",
    "type": "unchanged",
    "value1": "hexlet.io",
    "value2": "hexlet.io"
  },
  {
    "key": "proxy",
    "type": "removed",
    "value1": "123.234.53.22"
  },
  {
    "key": "timeout",
    "type": "changed",
    "value1": 50,
    "value2": 20
  },
  {
    "key": "verbose",
    "type": "added",
    "value2": true
  }
]
```

## Тестирование

```sh
make test            # прогон тестов Vitest
make test-coverage    # тесты с проверкой порога покрытия (vitest.config.js)
make lint             # ESLint
```
