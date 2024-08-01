import { test, fc } from '@fast-check/jest';
import dayjs from 'dayjs';
import { expect } from '@jest/globals';

import { fieldNameGen } from '../test/util';
import {
  required,
  REQUIRED,
  REQUIRED_ERROR,
  onlyIntegers,
  ONLY_INTEGERS,
  ONLY_INTEGERS_ERROR,
  onlyNaturals,
  ONLY_NATURALS,
  ONLY_NATURALS_ERROR,
  noMoreThanSixNumbers,
  NO_MORE_THAN_SIX_NUMBERS,
  NO_MORE_THAN_SIX_NUMBERS_ERROR,
  numberLessThan,
  NUMBER_LESS_THAN,
  NUMBER_LESS_THAN_ERROR,
  numberLessThanOrEqualTo,
  NUMBER_LESS_THAN_OR_EQUAL_TO,
  NUMBER_LESS_THAN_OR_EQUAL_TO_ERROR,
  matchesField,
  MATCHES_FIELD,
  MATCHES_FIELD_ERROR,
  hasLength,
  HAS_LENGTH,
  HAS_LENGTH_ERROR,
  DATE_BEFORE_TODAY,
  DATE_BEFORE_TODAY_ERROR,
  DATE_AFTER_TODAY,
  DATE_AFTER_TODAY_ERROR,
  validatorFns,
  runValidator,
  runValidatorErrorMessage,
  computeErrors,
  MATCHES_REGEX,
  MATCHES_REGEX_ERROR,
  matchesRegex,
  isRoutingNumber,
  IS_ROUTING_NUMBER,
  IS_ROUTING_NUMBER_ERROR,
  isAmericanOrCanadianRoutingNumber,
  IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER,
  IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER_ERROR,
  validateWhen,
  VALIDATE_WHEN,
  VALIDATE_WHEN_ERROR,
  validateWhenErrorMessage,
  validateSum,
  VALIDATE_SUM,
  VALIDATE_SUM_ERROR,
  validateSumErrorMessage,
  numberGreaterThan,
  NUMBER_GREATER_THAN,
  NUMBER_GREATER_THAN_ERROR,
  numberGreaterThanOrEqualTo,
  NUMBER_GREATER_THAN_OR_EQUAL_TO,
  NUMBER_GREATER_THAN_OR_EQUAL_TO_ERROR,
  hasNumber,
  HAS_NUMBER,
  HAS_NUMBER_ERROR,
  hasLowercaseLetter,
  HAS_LOWERCASE_LETTER,
  HAS_LOWERCASE_LETTER_ERROR,
  hasUppercaseLetter,
  HAS_UPPERCASE_LETTER,
  HAS_UPPERCASE_LETTER_ERROR,
  hasSpecialCharacter,
  HAS_SPECIAL_CHARACTER,
  HAS_SPECIAL_CHARACTER_ERROR,
  isProbablyEmail,
  IS_PROBABLY_EMAIL,
  IS_PROBABLY_EMAIL_ERROR,
  IS_VALID_MONTH,
  IS_VALID_MONTH_ERROR,
  validName,
  VALID_NAME,
  VALID_NAME_ERROR,
} from '../src/validation';

test('required validator produces correct validator object', () => {
  expect(required.error).toBe(REQUIRED_ERROR);
  expect(required()).toEqual({
    type: REQUIRED,
    args: [],
    error: REQUIRED_ERROR,
  });
});

test('onlyIntegers validator produces correct validator object', () => {
  expect(onlyIntegers.error).toBe(ONLY_INTEGERS_ERROR);
  expect(onlyIntegers()).toEqual({
    type: ONLY_INTEGERS,
    args: [],
    error: ONLY_INTEGERS_ERROR,
  });
});

test('onlyNaturals validator produces correct validator object', () => {
  expect(onlyNaturals.error).toBe(ONLY_NATURALS_ERROR);
  expect(onlyNaturals()).toEqual({
    type: ONLY_NATURALS,
    args: [],
    error: ONLY_NATURALS_ERROR,
  });
});

test('noMoreThanSixNumbers validator produces correct validator object', () => {
  expect(noMoreThanSixNumbers.error).toBe(NO_MORE_THAN_SIX_NUMBERS_ERROR);
  expect(noMoreThanSixNumbers()).toEqual({
    type: NO_MORE_THAN_SIX_NUMBERS,
    args: [],
    error: NO_MORE_THAN_SIX_NUMBERS_ERROR,
  });
});

test('numberLessThan validator produces correct validator object', () => {
  expect(numberLessThan.error).toBe(NUMBER_LESS_THAN_ERROR);
  expect(numberLessThan(3)).toEqual({
    type: NUMBER_LESS_THAN,
    args: [3],
    error: NUMBER_LESS_THAN_ERROR,
  });
});

test('numberLessThanOrEqualTo validator produces correct validator object', () => {
  expect(numberLessThanOrEqualTo.error).toBe(NUMBER_LESS_THAN_OR_EQUAL_TO_ERROR);
  expect(numberLessThanOrEqualTo(3)).toEqual({
    type: NUMBER_LESS_THAN_OR_EQUAL_TO,
    args: [3],
    error: NUMBER_LESS_THAN_OR_EQUAL_TO_ERROR,
  });
});

test('matchesField validator produces correct validator object', () => {
  expect(matchesField.error).toBe(MATCHES_FIELD_ERROR);
  expect(matchesField('foo')).toEqual({
    type: MATCHES_FIELD,
    args: ['foo'],
    error: MATCHES_FIELD_ERROR,
  });
});

test('matchesRegex validator produces correct validator object', () => {
  expect(matchesRegex.error).toBe(MATCHES_REGEX_ERROR);
  expect(matchesRegex('^hey.*joe$')).toEqual({
    type: MATCHES_REGEX,
    args: ['^hey.*joe$'],
    error: MATCHES_REGEX_ERROR,
  });
});

test('isRoutingNumber validator produces correct validator object', () => {
  expect(isRoutingNumber.error).toBe(IS_ROUTING_NUMBER_ERROR);
  expect(isRoutingNumber()).toEqual({
    type: IS_ROUTING_NUMBER,
    args: [],
    error: IS_ROUTING_NUMBER_ERROR,
  });
});

test('isAmericanOrCanadianRoutingNumber validator produces correct validator object', () => {
  expect(isAmericanOrCanadianRoutingNumber.error).toBe(
    IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER_ERROR
  );
  expect(isAmericanOrCanadianRoutingNumber()).toEqual({
    type: IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER,
    args: [],
    error: IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER_ERROR,
  });
});

test('numberGreaterThan validator produces correct validator object', () => {
  expect(numberGreaterThan.error).toBe(NUMBER_GREATER_THAN_ERROR);
  expect(numberGreaterThan('0')).toEqual({
    type: NUMBER_GREATER_THAN,
    args: ['0'],
    error: NUMBER_GREATER_THAN_ERROR,
  });
});

test('numberGreaterThanOrEqualTo validator produces correct validator object', () => {
  expect(numberGreaterThanOrEqualTo.error).toBe(
    NUMBER_GREATER_THAN_OR_EQUAL_TO_ERROR
  );
  expect(numberGreaterThanOrEqualTo('0')).toEqual({
    type: NUMBER_GREATER_THAN_OR_EQUAL_TO,
    args: ['0'],
    error: NUMBER_GREATER_THAN_OR_EQUAL_TO_ERROR,
  });
});

test('validateWhen validator produces correct validator object', () => {
  expect(validateWhen.error).toBe(VALIDATE_WHEN_ERROR);
  expect(validateWhen(required(), required(), 'foo')).toEqual({
    type: VALIDATE_WHEN,
    args: [
      {
        type: REQUIRED,
        args: [],
        error: REQUIRED_ERROR,
      },
      {
        type: REQUIRED,
        args: [],
        error: REQUIRED_ERROR,
      },
      'foo',
    ],
    // this is not a mistake, error key in validateWhen
    // object is the error key of the dependent validator
    error: REQUIRED_ERROR,
  });
});

test('validateWhen validator accepts when precondition is met and dependentValidator validates', () => {
  const form = {
    a: {
      rawValue: '21',
    },
  };
  expect(
    validatorFns[VALIDATE_WHEN](
      'foo',
      [
        {
          type: REQUIRED,
          args: [],
          error: REQUIRED_ERROR,
        },
        {
          type: NUMBER_GREATER_THAN,
          args: ['20'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
        'a',
      ],
      form
    )
  ).toBe(true);
});

test("validateWhen validator rejects when precondition is met and dependentValidator doesn't validate", () => {
  const form = {
    a: {
      rawValue: '21',
    },
  };
  expect(
    validatorFns[VALIDATE_WHEN](
      '',
      [
        {
          type: REQUIRED,
          args: [],
          error: REQUIRED_ERROR,
        },
        {
          type: NUMBER_GREATER_THAN,
          args: ['20'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
        'a',
      ],
      form
    )
  ).toBe(false);
});

test('validateWhen validator accepts when precondition is met and dependentValidator validates without other field dep', () => {
  expect(
    validatorFns[VALIDATE_WHEN](
      '6',
      [
        {
          type: NUMBER_GREATER_THAN,
          args: ['5'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
        {
          type: NUMBER_LESS_THAN,
          args: ['7'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
      ],
      {}
    )
  ).toBe(true);
});

test('validateWhen validator rejects when precondition is met and dependentValidator validates without other field dep', () => {
  expect(
    validatorFns[VALIDATE_WHEN](
      '4',
      [
        {
          type: NUMBER_GREATER_THAN,
          args: ['5'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
        {
          type: NUMBER_LESS_THAN,
          args: ['7'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
      ],
      {}
    )
  ).toBe(false);
});

test('validateWhen validator accepts when precondition is not met', () => {
  const form = {
    a: {
      rawValue: '20',
    },
  };
  expect(
    validatorFns[VALIDATE_WHEN](
      'foo',
      [
        {
          type: REQUIRED,
          args: [],
          error: REQUIRED_ERROR,
        },
        {
          type: NUMBER_GREATER_THAN,
          args: ['20'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
        'a',
      ],
      form
    )
  ).toBe(true);
});

test('validateWhen validator accepts when precondition is not met and dependentValidator validates without other field dep', () => {
  const form = {
    a: {
      rawValue: '21',
    },
  };
  expect(
    validatorFns[VALIDATE_WHEN](
      '20',
      [
        {
          type: NUMBER_LESS_THAN,
          args: ['20'],
          error: NUMBER_LESS_THAN_ERROR,
        },
        {
          type: NUMBER_GREATER_THAN,
          args: ['20'],
          error: NUMBER_GREATER_THAN_ERROR,
        },
      ],
      form
    )
  ).toBe(true);
});

test('validateWhen error message formats properly', () => {
  const expected = `foo was passed to validateWhen, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState). Also make sure you aren't passing validateWhen() to validateWhen
  as the primary validator.`;
  expect(validateWhenErrorMessage('foo')).toBe(expected);
});

test('validateWhen throws error when dependent field does not exist', () => {
  expect(() =>
    runValidator(
      {
        type: VALIDATE_WHEN,
        args: [
          {
            type: REQUIRED,
            args: [],
            error: REQUIRED_ERROR,
          },
          {
            type: REQUIRED,
            args: [],
            error: REQUIRED_ERROR,
          },
          'foo',
        ],
        error: REQUIRED_ERROR,
      },
      'bar',
      {}
    )
  ).toThrow(
    new Error(
      'foo was passed to matchesField, but that field does not exist in the form'
    )
  );
});

test("validateWhen throws error when dependent validator doesn't exist", () => {
  expect(() =>
    runValidator(
      {
        type: VALIDATE_WHEN,
        args: [
          {
            type: REQUIRED,
            args: [],
            error: REQUIRED_ERROR,
          },
          {
            type: 'NOT REAL VALIDATOR',
            args: [],
            error: REQUIRED_ERROR,
          },
          'foo',
        ],
        error: REQUIRED_ERROR,
      },
      'bar',
      {
        foo: {
          rawValue: 'bar',
        },
      }
    )
  ).toThrow(
    new Error(
      `NOT REAL VALIDATOR was passed to validateWhen, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState). Also make sure you aren't passing validateWhen() to validateWhen
  as the primary validator.`
    )
  );
});

test('validateSum validator produces', () => {
  expect(validateSum.error).toBe(VALIDATE_SUM_ERROR);
  expect(validateSum(numberGreaterThan(5), ['foo'])).toEqual({
    type: VALIDATE_SUM,
    args: [
      {
        args: [5],
        error: NUMBER_GREATER_THAN_ERROR,
        type: NUMBER_GREATER_THAN,
      },
      ['foo'],
    ],
    error: NUMBER_GREATER_THAN_ERROR,
  });
});

test('validateSum validates when validator validates against sum of identified fields', () => {
  const form = {
    a: {
      rawValue: '2',
    },
    b: {
      rawValue: '3',
    },
  };
  expect(
    validatorFns[VALIDATE_SUM](
      '5',
      [
        {
          args: [9],
          error: NUMBER_GREATER_THAN_ERROR,
          type: NUMBER_GREATER_THAN,
        },
        ['a', 'b'],
      ],
      form
    )
  ).toBe(true);
});

test("validateSum doesn't validate when validator doesn't validate against sum of identified fields", () => {
  const form = {
    a: {
      rawValue: '2',
    },
    b: {
      rawValue: '3',
    },
  };
  expect(
    validatorFns[VALIDATE_SUM](
      '5',
      [
        {
          args: [10],
          error: NUMBER_GREATER_THAN_ERROR,
          type: NUMBER_GREATER_THAN,
        },
        ['a', 'b'],
      ],
      form
    )
  ).toBe(false);
});

test('validateSum error message formats properly', () => {
  const expected = `foo was passed to validateSum, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState).`;
  expect(validateSumErrorMessage('foo')).toBe(expected);
});

test('validateSum throws error when dependent field does not exist', () => {
  expect(() =>
    runValidator(
      {
        type: VALIDATE_SUM,
        args: [
          {
            args: [5],
            error: NUMBER_GREATER_THAN_ERROR,
            type: NUMBER_GREATER_THAN,
          },
          ['foo'],
        ],
        error: NUMBER_GREATER_THAN_ERROR,
      },
      '5',
      {}
    )
  ).toThrow(
    new Error(
      'foo was passed to matchesField, but that field does not exist in the form'
    )
  );
});

test("validateSum throws error when validator doesn't exist", () => {
  expect(() =>
    runValidator(
      {
        type: VALIDATE_SUM,
        args: [
          {
            args: [5],
            error: NUMBER_GREATER_THAN_ERROR,
            type: 'NOT REAL VALIDATOR',
          },
          ['foo'],
        ],
        error: NUMBER_GREATER_THAN_ERROR,
      },
      'bar',
      {
        foo: {
          rawValue: '5',
        },
      }
    )
  ).toThrow(
    new Error(
      `NOT REAL VALIDATOR was passed to validateSum, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState).`
    )
  );
});

test.prop(
  'required validator accepts any string',
  [fc.string(1, 100)],
  (t, stringA) => {
    expect(!!validatorFns[REQUIRED](stringA, [], {})).toBe(true);
  }
);

test('required validator rejects empty string', () => {
  expect(validatorFns[REQUIRED]('', [], {})).toBe(false);
});

test.prop(
  'onlyIntegers validator accepts any integer string',
  [fc.integer()],
  (t, intA) => {
    expect(!!validatorFns[ONLY_INTEGERS](String(intA), [], {})).toBe(true);
  }
);

test.prop(
  'onlyIntegers rejects alphabetic string',
  [fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== '')],
  (t, stringA) => {
    expect(!validatorFns[ONLY_INTEGERS](stringA, [], {})).toBe(true);
  }
);

test.prop(
  'onlyIntegers rejects float string',
  [fc.float(), fc.integer(1, 10)],
  (t, floatA, fixedLength) => {
    expect(!validatorFns[ONLY_INTEGERS](floatA.toFixed(fixedLength), [], {})).toBe(
      true
    );
  }
);

test('onlyIntegers accepts empty string', () => {
  expect(validatorFns[ONLY_INTEGERS]('', [], {})).toBe(true);
});

test.prop(
  'onlyNaturals validator accepts any natural string',
  [fc.nat()],
  (t, natA) => {
    expect(!!validatorFns[ONLY_NATURALS](String(natA), [], {})).toBe(true);
  }
);

test.prop(
  'onlyNaturals rejects alphabetic string',
  [fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== '')],
  (t, stringA) => {
    expect(!validatorFns[ONLY_NATURALS](stringA, [], {})).toBe(true);
  }
);

test.prop(
  'onlyNaturals rejects float string',
  [fc.float(), fc.integer(1, 10)],
  (t, floatA, fixedLength) => {
    expect(!validatorFns[ONLY_NATURALS](floatA.toFixed(fixedLength), [], {})).toBe(
      true
    );
  }
);

test.prop(
  'onlyNaturals rejects negative integers string',
  [fc.integer(-1)],
  (t, negativeInt) => {
    expect(!validatorFns[ONLY_NATURALS](negativeInt, [], {})).toBe(true);
  }
);

test('onlyNaturals accepts empty string', () => {
  expect(validatorFns[ONLY_NATURALS]('', [], {})).toBe(true);
});

const smallerBiggerTuple = fc.float().chain((smallerNumber) =>
  fc.tuple(
    fc.constant(smallerNumber),
    fc
      .float(smallerNumber, Number.MAX_SAFE_INTEGER)
      .filter((n) => n !== smallerNumber)
  )
);

test('noMoreThanSixNumbers accepts empty string', () => {
  expect(validatorFns[NO_MORE_THAN_SIX_NUMBERS]('', {})).toBe(true);
});

test('noMoreThanSixNumbers accepts string with no numbers', () => {
  expect(validatorFns[NO_MORE_THAN_SIX_NUMBERS]('Mary Stevens', {})).toBe(true);
});

test('noMoreThanSixNumbers accepts string with less than six numbers', () => {
  expect(validatorFns[NO_MORE_THAN_SIX_NUMBERS]('3M Company', {})).toBe(true);
});

test('noMoreThanSixNumbers accepts string with exactly six numbers', () => {
  expect(
    validatorFns[NO_MORE_THAN_SIX_NUMBERS]('State Street Partnership 803716', {})
  ).toBe(true);
});

test('noMoreThanSixNumbers rejects string with more than six consecutive numbers', () => {
  expect(
    !validatorFns[NO_MORE_THAN_SIX_NUMBERS]('John Robertson 4813752033810349', {})
  ).toBe(true);
});

test('noMoreThanSixNumbers rejects string with more than six numbers separated by spaces', () => {
  expect(
    !validatorFns[NO_MORE_THAN_SIX_NUMBERS]('John Robertson 481375 203381 0349', {})
  ).toBe(true);
});

test('numberLessThan accepts empty string', () => {
  expect(validatorFns[NUMBER_LESS_THAN]('', {})).toBe(true);
});

test.prop(
  'numberLessThan accepts value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !!validatorFns[NUMBER_LESS_THAN](String(smallerNumber), [biggerNumber], {})
    ).toBe(true);
  }
);

test.prop(
  'numberLessThan rejects value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !validatorFns[NUMBER_LESS_THAN](String(biggerNumber), [smallerNumber], {})
    ).toBe(true);
  }
);

test.prop(
  'numberLessThan rejects value equal to argument',
  [fc.float()],
  (t, numberA) => {
    expect(!validatorFns[NUMBER_LESS_THAN](String(numberA), [numberA], {})).toBe(
      true
    );
  }
);

test('numberLessThanOrEqualTo accepts empty string', () => {
  expect(validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO]('', {})).toBe(true);
});

test.prop(
  'numberLessThanOrEqualTo accepts value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !!validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO](
        String(smallerNumber),
        [biggerNumber],
        {}
      )
    ).toBe(true);
  }
);

test.prop(
  'numberLessThanOrEqualTo rejects value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO](
        String(biggerNumber),
        [smallerNumber],
        {}
      )
    ).toBe(true);
  }
);

test.prop(
  'numberLessThanOrEqualTo accepts value equal to argument',
  [fc.float()],
  (t, numberA) => {
    expect(
      !!validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO](String(numberA), [numberA], {})
    ).toBe(true);
  }
);

test('numberGreaterThan accepts empty string', () => {
  expect(validatorFns[NUMBER_GREATER_THAN]('', {})).toBe(true);
});

test.prop(
  'numberGreaterThan accepts value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !!validatorFns[NUMBER_GREATER_THAN](String(biggerNumber), [smallerNumber], {})
    ).toBe(true);
  }
);

test.prop(
  'numberGreaterThan rejects value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !validatorFns[NUMBER_GREATER_THAN](String(smallerNumber), [biggerNumber], {})
    ).toBe(true);
  }
);

test.prop(
  'numberGreaterThan accepts value equal to argument',
  [fc.float()],
  (t, numberA) => {
    expect(!validatorFns[NUMBER_GREATER_THAN](String(numberA), [numberA], {})).toBe(
      true
    );
  }
);

test('numberGreaterThanOrEqualTo accepts empty string', () => {
  expect(validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO]('', {})).toBe(true);
});

test.prop(
  'numberGreaterThanOrEqualTo accepts value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !!validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO](
        String(biggerNumber),
        [smallerNumber],
        {}
      )
    ).toBe(true);
  }
);

test.prop(
  'numberGreaterThanOrEqualTo rejects value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    expect(
      !validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO](
        String(smallerNumber),
        [biggerNumber],
        {}
      )
    ).toBe(true);
  }
);

test.prop(
  'numberGreaterThanOrEqualTo accepts value equal to argument',
  [fc.float()],
  (t, numberA) => {
    expect(
      !!validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO](String(numberA), [numberA], {})
    ).toBe(true);
  }
);

test.prop(
  'matchesField accepts value equal to argument field rawValue',
  [fieldNameGen(), fc.string()],
  (t, fieldName, fieldValue) => {
    expect(
      !!validatorFns[MATCHES_FIELD](fieldValue, [fieldName], {
        [fieldName]: {
          rawValue: fieldValue,
        },
      })
    ).toBe(true);
  }
);

test.prop(
  'matchesField rejects value not equal to argument field rawValue',
  [
    fc.string(1, 15).filter((str) => /^[A-Za-z]$/.test(str)),
    fc.string(1, 15).filter((str) => /^[A-Za-z]$/.test(str)),
    fc.string(1, 15).filter((str) => /^[A-Za-z]$/.test(str)),
  ],
  (t, fieldName, fieldValue, fieldValueModifier) => {
    expect(
      !validatorFns[MATCHES_FIELD](fieldValue, [fieldName], {
        [fieldName]: {
          rawValue: `${fieldValue}${fieldValueModifier}`,
        },
      })
    ).toBe(true);
  }
);

const testRegexStr = '^[^s@]+@[^s@]+.[^s@]+$';
test.prop(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when passing regex test',
  [fc.string(1, 15).filter((str) => new RegExp(testRegexStr).test(str))],
  (t, valueThatMatchesRegex) => {
    expect(
      validatorFns[MATCHES_REGEX](valueThatMatchesRegex, [testRegexStr], {})
    ).toBe(true);
  }
);

test.prop(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when failing regex test',
  [fc.string(1, 15).filter((str) => !new RegExp(testRegexStr).test(str))],
  (t, valueThatDoesNotMatchRegex) => {
    expect(
      !validatorFns[MATCHES_REGEX](valueThatDoesNotMatchRegex, [testRegexStr], {})
    ).toBe(true);
  }
);

test('matchesRegex accepts when value is empty string', () => {
  expect(validatorFns[MATCHES_REGEX]('', ['doesntmatter'], {})).toBe(true);
});

test('matchesField throws an error when form does not include field', () => {
  expect(() =>
    runValidator(
      { type: MATCHES_FIELD, args: ['foo'], error: MATCHES_FIELD_ERROR },
      'bar',
      {}
    )
  ).toThrow(
    'foo was passed to matchesField, but that field does not exist in the form'
  );
});

// based on http://www.brainjar.com/js/validation
const calcCheckSum = (n0, n1, n2, n3, n4, n5, n6, n7) =>
  (10 -
    ((n0 * 3 + n1 * 7 + n2 * 1 + n3 * 3 + n4 * 7 + n5 * 1 + n6 * 3 + n7 * 7) % 10)) %
  10;

test.prop(
  'isRoutingNumber validates numbers that satisfy routing checksum rules',
  [
    fc.integer(1, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
  ],
  (t, ...first8Digits) => {
    const validRoutingNumber = `${first8Digits.join('')}${calcCheckSum(
      ...first8Digits
    )}`;
    expect(validatorFns[IS_ROUTING_NUMBER](validRoutingNumber, [], {})).toBe(true);
  }
);

test.prop(
  'isRoutingNumber does not validate when value is less than 9 digits',
  [
    fc.integer(1, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
  ],
  (t, ...first8Digits) => {
    const invalidRoutingNumber = first8Digits.join('');
    expect(!validatorFns[IS_ROUTING_NUMBER](invalidRoutingNumber, [], {})).toBe(
      true
    );
  }
);

test('isRoutingNumber validated on empty string', () => {
  expect(validatorFns[IS_ROUTING_NUMBER]('', [], {})).toBe(true);
});

/**
 * isAmericanOrCanadianRoutingNumber Validator
 */
test.prop(
  'isAmericanOrCanadianRoutingNumber validates 8 digit Canadian routing numbers',
  [
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
  ],
  (...first8Digits) => {
    const validRoutingNumber = first8Digits.join('');
    expect(
      validatorFns[IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER](
        validRoutingNumber,
        [],
        {}
      )
    ).toBe(true);
  }
);

test.prop(
  'isAmericanOrCanadianRoutingNumber validates 9 digit U.S. routing numbers with a valid checksum',
  [
    fc.integer(1, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
    fc.integer(0, 9),
  ],
  (...first8Digits) => {
    const validRoutingNumber = `${first8Digits.join('')}${calcCheckSum(
      ...first8Digits
    )}`;
    expect(
      validatorFns[IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER](
        validRoutingNumber,
        [],
        {}
      )
    ).toBe(true);
  }
);

test('isAmericanOrCanadianRoutingNumber does not validate 9 digit U.S. routing numbers without a valid checksum', () => {
  expect(
    validatorFns[IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER]('123456789', [], {})
  ).toBe(false);
});

test('isAmericanOrCanadianRoutingNumber does not validate strings of lengths less than 8', () => {
  expect(
    validatorFns[IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER]('1234567', [], {})
  ).toBe(false);
});

test('isAmericanOrCanadianRoutingNumber does not validate strings of lengths greater than 9', () => {
  expect(
    validatorFns[IS_AMERICAN_OR_CANADIAN_ROUTING_NUMBER]('1234567891', [], {})
  ).toBe(false);
});

test('runValidator returns null when validator accepts', () => {
  expect(runValidator({ type: REQUIRED, args: [] }, 'foo', {})).toBe(null);
});

test('runValidator returns validator error when validator rejects', () => {
  expect(
    runValidator({ type: REQUIRED, args: [], error: REQUIRED_ERROR }, '', {})
  ).toBe(REQUIRED_ERROR);
});

test('runValidator throws error when validatorFn does not exist', () => {
  expect(() =>
    runValidator({ type: 'foo', args: [], error: 'bar' }, '', {})
  ).toThrow(runValidatorErrorMessage('foo'));
});

test('computeErrors returns an empty array when validators accept', () => {
  const acceptingForm = {
    foo: {
      rawValue: '12',
      validators: [
        { type: REQUIRED, args: [], error: REQUIRED_ERROR },
        { type: ONLY_INTEGERS, args: [], error: ONLY_INTEGERS_ERROR },
        { type: NUMBER_LESS_THAN, args: [13], error: NUMBER_LESS_THAN_ERROR },
      ],
    },
  };
  expect(computeErrors('foo', acceptingForm)).toEqual([]);
});

test('computeErrors returns an array of errors for each rejecting validator', () => {
  const rejectingForm = {
    foo: {
      rawValue: '11',
      validators: [
        { type: REQUIRED, args: [], error: REQUIRED_ERROR },
        { type: MATCHES_FIELD, args: ['bar'], error: MATCHES_FIELD_ERROR },
        { type: ONLY_INTEGERS, args: [], error: ONLY_INTEGERS_ERROR },
        { type: NUMBER_LESS_THAN, args: [10], error: NUMBER_LESS_THAN_ERROR },
      ],
    },
    bar: {
      rawValue: '12',
      validators: [],
    },
  };
  expect(computeErrors('foo', rejectingForm)).toEqual([
    MATCHES_FIELD_ERROR,
    NUMBER_LESS_THAN_ERROR,
  ]);
});

test('hasLength validator creates valid validator object', () => {
  expect(hasLength.error).toBe(HAS_LENGTH_ERROR);
  expect(hasLength(1, 10)).toEqual({
    type: HAS_LENGTH,
    args: [1, 10],
    error: HAS_LENGTH_ERROR,
  });
});

//TODO: Make prop test
test('hasLength validator returns null when validator accepts', () => {
  expect(
    runValidator(
      { type: HAS_LENGTH, args: [1, 10], error: HAS_LENGTH_ERROR },
      '123',
      {}
    )
  ).toBe(null);
});

test('dateBeforeToday validator accepts when value is empty string', () => {
  expect(validatorFns[DATE_BEFORE_TODAY]('', ['MM/YY', 'month', true], {})).toBe(
    true
  );
});

test('dateBeforeToday validator returns error when date is after today', () => {
  expect(
    runValidator(
      {
        type: DATE_BEFORE_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_BEFORE_TODAY_ERROR,
      },
      dayjs().add(5, 'month').format('MM/YY'),
      {}
    )
  ).toBe(DATE_BEFORE_TODAY_ERROR);
});

test('dateBeforeToday validator passes when inclusive is true and value is same as today', () => {
  expect(
    runValidator(
      {
        type: DATE_BEFORE_TODAY,
        args: ['MM/YY', 'month', true],
        error: DATE_BEFORE_TODAY_ERROR,
      },
      dayjs().format('MM/YY'),
      {}
    )
  ).toBe(null);
});

test('dateBeforeToday validator returns error when inclusive is false and value is same as today', () => {
  expect(
    runValidator(
      {
        type: DATE_BEFORE_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_BEFORE_TODAY_ERROR,
      },
      dayjs().format('MM/YY'),
      {}
    )
  ).toBe(DATE_BEFORE_TODAY_ERROR);
});

test('dateAfterToday validator accepts when value is empty string', () => {
  expect(validatorFns[DATE_AFTER_TODAY]('', ['MM/YY', 'month', true], {})).toBe(
    true
  );
});

test('dateAfterToday validator returns error when date is before today', () => {
  expect(
    runValidator(
      {
        type: DATE_AFTER_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_AFTER_TODAY_ERROR,
      },
      dayjs().subtract(5, 'month').format('MM/YY'),
      {}
    )
  ).toBe(DATE_AFTER_TODAY_ERROR);
});

test('dateAfterToday validator passes when inclusive is true and value is same as today', () => {
  expect(
    runValidator(
      {
        type: DATE_AFTER_TODAY,
        args: ['MM/YY', 'month', true],
        error: DATE_AFTER_TODAY_ERROR,
      },
      dayjs().format('MM/YY')
    )
  ).toBe(null);
});

test('dateAfterToday validator returns error when inclusive is false and value is same as today', () => {
  expect(
    runValidator(
      {
        type: DATE_AFTER_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_AFTER_TODAY_ERROR,
      },
      dayjs().format('MM/YY')
    )
  ).toBe(DATE_AFTER_TODAY_ERROR);
});

test('isValidMonth validator throws error when start position resovles to NaN', () => {
  expect(() =>
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['a'],
        error: IS_VALID_MONTH_ERROR,
      },
      '01/02/22'
    )
  ).toThrow('Month start position has to be a valid integer string');
});

test('isValidMonth validator fails when start position is greater than string length', () => {
  expect(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['6'],
        error: IS_VALID_MONTH_ERROR,
      },
      '01/22'
    )
  ).toBe(IS_VALID_MONTH_ERROR);
});

test('isValidMonth validator fails when month is less than 1', () => {
  expect(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '00/22'
    )
  ).toBe(IS_VALID_MONTH_ERROR);
});

test('isValidMonth validator fails when month is negative', () => {
  expect(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '-2104'
    )
  ).toBe(IS_VALID_MONTH_ERROR);
});

test('isValidMonth validator fails when month is greater than 12', () => {
  expect(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '9821'
    )
  ).toBe(IS_VALID_MONTH_ERROR);
});

test('isValidMonth validator passes with valid month', () => {
  expect(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '1021'
    )
  ).toBe(null);
});

test('hasLength validator accepts when value is empty string', () => {
  expect(validatorFns[HAS_LENGTH]('', [1, 10], {})).toBe(true);
});

//TODO: Make prop test
test('hasLength validator returns error when validator rejects', () => {
  expect(
    runValidator(
      { type: HAS_LENGTH, args: [1, 3], error: HAS_LENGTH_ERROR },
      '1234',
      {}
    )
  ).toBe(HAS_LENGTH_ERROR);
});

test('hasLength throws error when max or min are not passed', () => {
  expect(() =>
    runValidator({ type: HAS_LENGTH, args: [1], error: HAS_LENGTH_ERROR }, '9', {})
  ).toThrow(
    'Max and min need to be defined for hasLength, both or one of them is undefined'
  );
  expect(() =>
    runValidator({ type: HAS_LENGTH, args: [], error: HAS_LENGTH_ERROR }, '9', {})
  ).toThrow(
    'Max and min need to be defined for hasLength, both or one of them is undefined'
  );
});

test('hasLength throws error when max is less than min', () => {
  expect(() =>
    runValidator(
      { type: HAS_LENGTH, args: [10, 1], error: HAS_LENGTH_ERROR },
      '9',
      {}
    )
  ).toThrow('hasLength validator was passed a min greater than the max');
});

test('hasNumber validator produces correct validator object', () => {
  expect(hasNumber.error).toBe(HAS_NUMBER_ERROR);
  expect(hasNumber()).toEqual({
    type: HAS_NUMBER,
    args: [],
    error: HAS_NUMBER_ERROR,
  });
});

test('hasNumber accepts when value is empty string', () => {
  expect(validatorFns[HAS_NUMBER]('', ['doesntmatter'], {})).toBe(true);
});

test.prop(
  'hasNumber rejects string with no numbers',
  [
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(!validatorFns[HAS_NUMBER](`${stringA.join('')}`, [], {})).toBe(true);
  }
);

test.prop(
  'hasNumber accepts string with number',
  [
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(validatorFns[HAS_NUMBER](`${stringA.join('')}`, [], {})).toBe(true);
  }
);

test('hasLowercaseLetter validator produces correct validator object', () => {
  expect(hasLowercaseLetter.error).toBe(HAS_LOWERCASE_LETTER_ERROR);
  expect(hasLowercaseLetter()).toEqual({
    type: HAS_LOWERCASE_LETTER,
    args: [],
    error: HAS_LOWERCASE_LETTER_ERROR,
  });
});

test('hasLowercaseLetter accepts when value is empty string', () => {
  expect(validatorFns[HAS_LOWERCASE_LETTER]('', ['doesntmatter'], {})).toBe(true);
});

test.prop(
  'hasLowercaseLetter rejects string with with no lowercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(!validatorFns[HAS_LOWERCASE_LETTER](`${stringA.join('')}`, [], {})).toBe(
      true
    );
  }
);

test.prop(
  'hasLowercaseLetter accepts string with with a lowercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(validatorFns[HAS_LOWERCASE_LETTER](`${stringA.join('')}`, [], {})).toBe(
      true
    );
  }
);

/**
 * Tests for validName
 */
test('validName validator produces correct validator object', () => {
  const invalidNameString = ` `;
  expect(validName.error).toBe(VALID_NAME_ERROR);
  expect(validName(invalidNameString)).toEqual({
    type: VALID_NAME,
    args: [invalidNameString],
    error: VALID_NAME_ERROR,
  });
});

test('validName validator accepts when value is valid name', () => {
  const validNameStrings = [
    'John Smith',
    'Nancy Moore-Klêne',
    'Jien Xi',
    'Brandon D. Jones',
    'Ashley Q. W. McLeary',
    'Mr. Jack Kirby',
    'Dr. A. Petter Walter',
    'Dw’t Hólmes III',
    'Ms. Jenny',
    'Emieral De Lassorel',
    'Jón Einarsson',
    'Rev. Yu McCallester',
  ];
  validNameStrings.map((validNameString) =>
    expect(validatorFns[VALID_NAME](validNameString, ['doesntmatter'], {})).toBe(
      true
    )
  );
});

test('validName validator accepts a space between multiple names', () => {
  expect(validatorFns[VALID_NAME](`Mary Beth`, ['doesntmatter'], {})).toBe(true);
});

test('validName validator accepts an apostrophe', () => {
  expect(validatorFns[VALID_NAME](`O'Connor`, ['doesntmatter'], {})).toBe(true);
});

test('validName validator rejects an empty space', () => {
  expect(validatorFns[VALID_NAME](` `)).toBe(false);
});

test('validName validator rejects an empty field', () => {
  expect(validatorFns[VALID_NAME](``)).toBe(false);
});

test('hasUppercaseLetter validator produces correct validator object', () => {
  expect(hasUppercaseLetter.error).toBe(HAS_UPPERCASE_LETTER_ERROR);
  expect(hasUppercaseLetter()).toEqual({
    type: HAS_UPPERCASE_LETTER,
    args: [],
    error: HAS_UPPERCASE_LETTER_ERROR,
  });
});

test('hasUppercaseLetter accepts when value is empty string', () => {
  expect(validatorFns[HAS_UPPERCASE_LETTER]('', ['doesntmatter'], {})).toBe(true);
});

test.prop(
  'hasUpperLetter rejects string with with no uppercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(!validatorFns[HAS_UPPERCASE_LETTER](`${stringA.join('')}`, [], {})).toBe(
      true
    );
  }
);

test.prop(
  'hasUppercaseLetter accepts string with with a uppercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(validatorFns[HAS_UPPERCASE_LETTER](`${stringA.join('')}`, [], {})).toBe(
      true
    );
  }
);

test('hasSpecialCharacter validator produces correct validator object', () => {
  expect(hasSpecialCharacter.error).toBe(HAS_SPECIAL_CHARACTER_ERROR);
  expect(hasSpecialCharacter()).toEqual({
    type: HAS_SPECIAL_CHARACTER,
    args: [],
    error: HAS_SPECIAL_CHARACTER_ERROR,
  });
});

test('hasSpecialCharacter accepts when value is empty string', () => {
  expect(validatorFns[HAS_SPECIAL_CHARACTER]('', ['doesntmatter'], {})).toBe(true);
});

test.prop(
  'hasSpecialCharacter rejects string with with no special character',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(!validatorFns[HAS_SPECIAL_CHARACTER](`${stringA.join('')}`, [], {})).toBe(
      true
    );
  }
);

test.prop(
  'hasSpecialCharacter accepts string with with a special character',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc
      .stringOf(fc.char().filter((c) => /[!@#$%^&*.?]/.test(c)))
      .filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    expect(validatorFns[HAS_SPECIAL_CHARACTER](`${stringA.join('')}`, [], {})).toBe(
      true
    );
  }
);

test('isProbablyEmail validator produces correct validator object', () => {
  expect(isProbablyEmail.error).toBe(IS_PROBABLY_EMAIL_ERROR);
  expect(isProbablyEmail()).toEqual({
    type: IS_PROBABLY_EMAIL,
    args: [],
    error: IS_PROBABLY_EMAIL_ERROR,
  });
});

test('isProbablyEmail accepts when value is empty string', () => {
  expect(validatorFns[IS_PROBABLY_EMAIL]('', ['doesntmatter'], {})).toBe(true);
});

const testRegexEmailString = /^\S+@\S+\.\S+$/;

test.prop(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when passing regex test for isProbablyEmail',
  [fc.string(1, 15).filter((str) => new RegExp(testRegexEmailString).test(str))],
  (t, valueThatMatchesRegex) => {
    expect(
      validatorFns[IS_PROBABLY_EMAIL](
        valueThatMatchesRegex,
        [testRegexEmailString],
        {}
      )
    ).toBe(true);
  }
);

test.prop(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when failing regex test for isProbablyEmail',
  [fc.string(1, 15).filter((str) => !new RegExp(testRegexEmailString).test(str))],
  (t, valueThatDoesNotMatchRegex) => {
    expect(
      !validatorFns[IS_PROBABLY_EMAIL](
        valueThatDoesNotMatchRegex,
        [testRegexEmailString],
        {}
      )
    ).toBe(true);
  }
);
