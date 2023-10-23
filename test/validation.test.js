import test from 'ava';
import { testProp, fc } from 'ava-fast-check';
import dayjs from 'dayjs';

import { fieldNameGen } from './util';
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
  IS_PERCENTAGE,
} from '../src/validation';

test('required validator produces correct validator object', (t) => {
  t.is(required.error, REQUIRED_ERROR);
  t.deepEqual(required(), {
    type: REQUIRED,
    args: [],
    error: REQUIRED_ERROR,
  });
});

test('onlyIntegers validator produces correct validator object', (t) => {
  t.is(onlyIntegers.error, ONLY_INTEGERS_ERROR);
  t.deepEqual(onlyIntegers(), {
    type: ONLY_INTEGERS,
    args: [],
    error: ONLY_INTEGERS_ERROR,
  });
});

test('onlyNaturals validator produces correct validator object', (t) => {
  t.is(onlyNaturals.error, ONLY_NATURALS_ERROR);
  t.deepEqual(onlyNaturals(), {
    type: ONLY_NATURALS,
    args: [],
    error: ONLY_NATURALS_ERROR,
  });
});

test('numberLessThan validator produces correct validator object', (t) => {
  t.is(numberLessThan.error, NUMBER_LESS_THAN_ERROR);
  t.deepEqual(numberLessThan(3), {
    type: NUMBER_LESS_THAN,
    args: [3],
    error: NUMBER_LESS_THAN_ERROR,
  });
});

test('numberLessThanOrEqualTo validator produces correct validator object', (t) => {
  t.is(numberLessThanOrEqualTo.error, NUMBER_LESS_THAN_OR_EQUAL_TO_ERROR);
  t.deepEqual(numberLessThanOrEqualTo(3), {
    type: NUMBER_LESS_THAN_OR_EQUAL_TO,
    args: [3],
    error: NUMBER_LESS_THAN_OR_EQUAL_TO_ERROR,
  });
});

test('matchesField validator produces correct validator object', (t) => {
  t.is(matchesField.error, MATCHES_FIELD_ERROR);
  t.deepEqual(matchesField('foo'), {
    type: MATCHES_FIELD,
    args: ['foo'],
    error: MATCHES_FIELD_ERROR,
  });
});

test('matchesRegex validator produces correct validator object', (t) => {
  t.is(matchesRegex.error, MATCHES_REGEX_ERROR);
  t.deepEqual(matchesRegex('^hey.*joe$'), {
    type: MATCHES_REGEX,
    args: ['^hey.*joe$'],
    error: MATCHES_REGEX_ERROR,
  });
});

test('isRoutingNumber validator produces correct validator object', (t) => {
  t.is(isRoutingNumber.error, IS_ROUTING_NUMBER_ERROR);
  t.deepEqual(isRoutingNumber(), {
    type: IS_ROUTING_NUMBER,
    args: [],
    error: IS_ROUTING_NUMBER_ERROR,
  });
});

test('numberGreaterThan validator produces correct validator object', (t) => {
  t.is(numberGreaterThan.error, NUMBER_GREATER_THAN_ERROR);
  t.deepEqual(numberGreaterThan('0'), {
    type: NUMBER_GREATER_THAN,
    args: ['0'],
    error: NUMBER_GREATER_THAN_ERROR,
  });
});

test('numberGreaterThanOrEqualTo validator produces correct validator object', (t) => {
  t.is(numberGreaterThanOrEqualTo.error, NUMBER_GREATER_THAN_OR_EQUAL_TO_ERROR);
  t.deepEqual(numberGreaterThanOrEqualTo('0'), {
    type: NUMBER_GREATER_THAN_OR_EQUAL_TO,
    args: ['0'],
    error: NUMBER_GREATER_THAN_OR_EQUAL_TO_ERROR,
  });
});

test('validateWhen validator produces correct validator object', (t) => {
  t.is(validateWhen.error, VALIDATE_WHEN_ERROR);
  t.deepEqual(validateWhen(required(), required(), 'foo'), {
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

test('validateWhen validator accepts when precondition is met and dependentValidator validates', (t) => {
  const form = {
    a: {
      rawValue: '21',
    },
  };
  t.is(
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
    ),
    true
  );
});

test("validateWhen validator rejects when precondition is met and dependentValidator doesn't validate", (t) => {
  const form = {
    a: {
      rawValue: '21',
    },
  };
  t.is(
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
    ),
    false
  );
});

test('validateWhen validator accepts when precondition is met and dependentValidator validates without other field dep', (t) => {
  t.is(
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
    ),
    true
  );
});

test('validateWhen validator rejects when precondition is met and dependentValidator validates without other field dep', (t) => {
  t.is(
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
    ),
    false
  );
});

test('validateWhen validator accepts when precondition is not met', (t) => {
  const form = {
    a: {
      rawValue: '20',
    },
  };
  t.is(
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
    ),
    true
  );
});

test('validateWhen validator accepts when precondition is not met and dependentValidator validates without other field dep', (t) => {
  const form = {
    a: {
      rawValue: '21',
    },
  };
  t.is(
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
    ),
    true
  );
});

test('validateWhen error message formats properly', (t) => {
  const expected = `foo was passed to validateWhen, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState). Also make sure you aren't passing validateWhen() to validateWhen
  as the primary validator.`;
  t.is(validateWhenErrorMessage('foo'), expected);
});

test('validateWhen throws error when dependent field does not exist', (t) => {
  const validatorError = t.throws(() =>
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
  );
  const expected = Error(
    'foo was passed to matchesField, but that field does not exist in the form'
  );
  t.deepEqual(validatorError, expected);
});

test("validateWhen throws error when dependent validator doesn't exist", (t) => {
  const validatorError = t.throws(() =>
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
  );
  const expected = Error(
    `NOT REAL VALIDATOR was passed to validateWhen, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState). Also make sure you aren't passing validateWhen() to validateWhen
  as the primary validator.`
  );
  t.deepEqual(validatorError, expected);
});

test('validateSum validator produces', (t) => {
  t.is(validateSum.error, VALIDATE_SUM_ERROR);
  t.deepEqual(validateSum(numberGreaterThan(5), ['foo']), {
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

test('validateSum validates when validator validates against sum of identified fields', (t) => {
  const form = {
    a: {
      rawValue: '2',
    },
    b: {
      rawValue: '3',
    },
  };
  t.is(
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
    ),
    true
  );
});

test("validateSum doesn't validate when validator doesn't validate against sum of identified fields", (t) => {
  const form = {
    a: {
      rawValue: '2',
    },
    b: {
      rawValue: '3',
    },
  };
  t.is(
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
    ),
    false
  );
});

test('validateSum error message formats properly', (t) => {
  const expected = `foo was passed to validateSum, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState).`;
  t.is(validateSumErrorMessage('foo'), expected);
});

test('validateSum throws error when dependent field does not exist', (t) => {
  const validatorError = t.throws(() =>
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
  );
  const expected = Error(
    'foo was passed to matchesField, but that field does not exist in the form'
  );
  t.deepEqual(validatorError, expected);
});

test("validateSum throws error when validator doesn't exist", (t) => {
  const validatorError = t.throws(() =>
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
  );
  const expected = Error(
    `NOT REAL VALIDATOR was passed to validateSum, but that validator type does not exist.
  Please check that you are only calling validator creator functions exported from
  redux-freeform in your form config and that you didn't forget to
  invoke the validator creator (you cannot pass the functions themselves to
  createFormState).`
  );
  t.deepEqual(validatorError, expected);
});

testProp(
  'required validator accepts any string',
  [fc.string(1, 100)],
  (t, stringA) => {
    t.true(!!validatorFns[REQUIRED](stringA, [], {}));
  }
);

test('required validator rejects empty string', (t) => {
  t.false(validatorFns[REQUIRED]('', [], {}));
});

testProp(
  'onlyIntegers validator accepts any integer string',
  [fc.integer()],
  (t, intA) => {
    t.true(!!validatorFns[ONLY_INTEGERS](String(intA), [], {}));
  }
);

testProp(
  'onlyIntegers rejects alphabetic string',
  [fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== '')],
  (t, stringA) => {
    t.true(!validatorFns[ONLY_INTEGERS](stringA, [], {}));
  }
);

testProp(
  'onlyIntegers rejects float string',
  [fc.float(), fc.integer(1, 10)],
  (t, floatA, fixedLength) => {
    t.true(!validatorFns[ONLY_INTEGERS](floatA.toFixed(fixedLength), [], {}));
  }
);

test('onlyIntegers accepts empty string', (t) => {
  t.true(validatorFns[ONLY_INTEGERS]('', [], {}));
});

testProp(
  'onlyNaturals validator accepts any natural string',
  [fc.nat()],
  (t, natA) => {
    t.true(!!validatorFns[ONLY_NATURALS](String(natA), [], {}));
  }
);

testProp(
  'onlyNaturals rejects alphabetic string',
  [fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== '')],
  (t, stringA) => {
    t.true(!validatorFns[ONLY_NATURALS](stringA, [], {}));
  }
);

testProp(
  'onlyNaturals rejects float string',
  [fc.float(), fc.integer(1, 10)],
  (t, floatA, fixedLength) => {
    t.true(!validatorFns[ONLY_NATURALS](floatA.toFixed(fixedLength), [], {}));
  }
);

testProp(
  'onlyNaturals rejects negative integers string',
  [fc.integer(-1)],
  (t, negativeInt) => {
    t.true(!validatorFns[ONLY_NATURALS](negativeInt, [], {}));
  }
);

test('onlyNaturals accepts empty string', (t) => {
  t.true(validatorFns[ONLY_NATURALS]('', [], {}));
});

const smallerBiggerTuple = fc.float().chain((smallerNumber) =>
  fc.tuple(
    fc.constant(smallerNumber),
    fc
      .float(smallerNumber, Number.MAX_SAFE_INTEGER)
      .filter((n) => n !== smallerNumber)
  )
);

test('numberLessThan accepts empty string', (t) => {
  t.true(validatorFns[NUMBER_LESS_THAN]('', {}));
});

testProp(
  'numberLessThan accepts value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !!validatorFns[NUMBER_LESS_THAN](String(smallerNumber), [biggerNumber], {})
    );
  }
);

testProp(
  'numberLessThan rejects value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !validatorFns[NUMBER_LESS_THAN](String(biggerNumber), [smallerNumber], {})
    );
  }
);

testProp(
  'numberLessThan rejects value equal to argument',
  [fc.float()],
  (t, numberA) => {
    t.true(!validatorFns[NUMBER_LESS_THAN](String(numberA), [numberA], {}));
  }
);

test('numberLessThanOrEqualTo accepts empty string', (t) => {
  t.true(validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO]('', {}));
});

testProp(
  'numberLessThanOrEqualTo accepts value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !!validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO](
        String(smallerNumber),
        [biggerNumber],
        {}
      )
    );
  }
);

testProp(
  'numberLessThanOrEqualTo rejects value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO](
        String(biggerNumber),
        [smallerNumber],
        {}
      )
    );
  }
);

testProp(
  'numberLessThanOrEqualTo accepts value equal to argument',
  [fc.float()],
  (t, numberA) => {
    t.true(
      !!validatorFns[NUMBER_LESS_THAN_OR_EQUAL_TO](String(numberA), [numberA], {})
    );
  }
);

test('numberGreaterThan accepts empty string', (t) => {
  t.true(validatorFns[NUMBER_GREATER_THAN]('', {}));
});

testProp(
  'numberGreaterThan accepts value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !!validatorFns[NUMBER_GREATER_THAN](String(biggerNumber), [smallerNumber], {})
    );
  }
);

testProp(
  'numberGreaterThan rejects value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !validatorFns[NUMBER_GREATER_THAN](String(smallerNumber), [biggerNumber], {})
    );
  }
);

testProp(
  'numberGreaterThan accepts value equal to argument',
  [fc.float()],
  (t, numberA) => {
    t.true(!validatorFns[NUMBER_GREATER_THAN](String(numberA), [numberA], {}));
  }
);

test('numberGreaterThanOrEqualTo accepts empty string', (t) => {
  t.true(validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO]('', {}));
});

testProp(
  'numberGreaterThanOrEqualTo accepts value greater than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !!validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO](
        String(biggerNumber),
        [smallerNumber],
        {}
      )
    );
  }
);

testProp(
  'numberGreaterThanOrEqualTo rejects value less than argument',
  [smallerBiggerTuple],
  (t, [smallerNumber, biggerNumber]) => {
    t.true(
      !validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO](
        String(smallerNumber),
        [biggerNumber],
        {}
      )
    );
  }
);

testProp(
  'numberGreaterThanOrEqualTo accepts value equal to argument',
  [fc.float()],
  (t, numberA) => {
    t.true(
      !!validatorFns[NUMBER_GREATER_THAN_OR_EQUAL_TO](String(numberA), [numberA], {})
    );
  }
);

testProp(
  'matchesField accepts value equal to argument field rawValue',
  [fieldNameGen(), fc.string()],
  (t, fieldName, fieldValue) => {
    t.true(
      !!validatorFns[MATCHES_FIELD](fieldValue, [fieldName], {
        [fieldName]: {
          rawValue: fieldValue,
        },
      })
    );
  }
);

testProp(
  'matchesField rejects value not equal to argument field rawValue',
  [
    fc.string(1, 15).filter((str) => /^[A-Za-z]$/.test(str)),
    fc.string(1, 15).filter((str) => /^[A-Za-z]$/.test(str)),
    fc.string(1, 15).filter((str) => /^[A-Za-z]$/.test(str)),
  ],
  (t, fieldName, fieldValue, fieldValueModifier) => {
    t.true(
      !validatorFns[MATCHES_FIELD](fieldValue, [fieldName], {
        [fieldName]: {
          rawValue: `${fieldValue}${fieldValueModifier}`,
        },
      })
    );
  }
);

const testRegexStr = '^[^s@]+@[^s@]+.[^s@]+$';
testProp(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when passing regex test',
  [fc.string(1, 15).filter((str) => new RegExp(testRegexStr).test(str))],
  (t, valueThatMatchesRegex) => {
    t.true(validatorFns[MATCHES_REGEX](valueThatMatchesRegex, [testRegexStr], {}));
  }
);

testProp(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when failing regex test',
  [fc.string(1, 15).filter((str) => !new RegExp(testRegexStr).test(str))],
  (t, valueThatDoesNotMatchRegex) => {
    t.true(
      !validatorFns[MATCHES_REGEX](valueThatDoesNotMatchRegex, [testRegexStr], {})
    );
  }
);

test('matchesRegex accepts when value is empty string', (t) => {
  t.is(validatorFns[MATCHES_REGEX]('', ['doesntmatter'], {}), true);
});

test('matchesField throws an error when form does not include field', (t) => {
  const validatorError = t.throws(() =>
    runValidator(
      { type: MATCHES_FIELD, args: ['foo'], error: MATCHES_FIELD_ERROR },
      'bar',
      {}
    )
  );
  t.is(
    validatorError.message,
    'foo was passed to matchesField, but that field does not exist in the form'
  );
});

// based on http://www.brainjar.com/js/validation
const calcCheckSum = (n0, n1, n2, n3, n4, n5, n6, n7) =>
  (10 -
    ((n0 * 3 + n1 * 7 + n2 * 1 + n3 * 3 + n4 * 7 + n5 * 1 + n6 * 3 + n7 * 7) % 10)) %
  10;

testProp(
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
    t.true(validatorFns[IS_ROUTING_NUMBER](validRoutingNumber, [], {}));
  }
);

testProp(
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
    t.true(!validatorFns[IS_ROUTING_NUMBER](invalidRoutingNumber, [], {}));
  }
);

test('isRoutingNumber validated on empty string', (t) => {
  t.is(validatorFns[IS_ROUTING_NUMBER]('', [], {}), true);
});

test('runValidator returns null when validator accepts', (t) => {
  t.is(runValidator({ type: REQUIRED, args: [] }, 'foo', {}), null);
});

test('runValidator returns validator error when validator rejects', (t) => {
  t.is(
    runValidator({ type: REQUIRED, args: [], error: REQUIRED_ERROR }, '', {}),
    REQUIRED_ERROR
  );
});

test('runValidator throws error when validatorFn does not exist', (t) => {
  const validatorError = t.throws(() =>
    runValidator({ type: 'foo', args: [], error: 'bar' }, '', {})
  );
  t.is(validatorError.message, runValidatorErrorMessage('foo'));
});

test('computeErrors returns an empty array when validators accept', (t) => {
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
  t.deepEqual(computeErrors('foo', acceptingForm), []);
});

test('computeErrors returns an array of errors for each rejecting validator', (t) => {
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
  t.deepEqual(computeErrors('foo', rejectingForm), [
    MATCHES_FIELD_ERROR,
    NUMBER_LESS_THAN_ERROR,
  ]);
});

test('hasLength validator creates valid validator object', (t) => {
  t.is(hasLength.error, HAS_LENGTH_ERROR);
  t.deepEqual(hasLength(1, 10), {
    type: HAS_LENGTH,
    args: [1, 10],
    error: HAS_LENGTH_ERROR,
  });
});

//TODO: Make prop test
test('hasLength validator returns null when validator accepts', (t) => {
  t.is(
    runValidator(
      { type: HAS_LENGTH, args: [1, 10], error: HAS_LENGTH_ERROR },
      '123',
      {}
    ),
    null
  );
});

test('dateBeforeToday validator accepts when value is empty string', (t) => {
  t.is(validatorFns[DATE_BEFORE_TODAY]('', ['MM/YY', 'month', true], {}), true);
});

test('dateBeforeToday validator returns error when date is after today', (t) => {
  t.is(
    runValidator(
      {
        type: DATE_BEFORE_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_BEFORE_TODAY_ERROR,
      },
      dayjs().add(5, 'month').format('MM/YY'),
      {}
    ),
    DATE_BEFORE_TODAY_ERROR
  );
});

test('dateBeforeToday validator passes when inclusive is true and value is same as today', (t) => {
  t.is(
    runValidator(
      {
        type: DATE_BEFORE_TODAY,
        args: ['MM/YY', 'month', true],
        error: DATE_BEFORE_TODAY_ERROR,
      },
      dayjs().format('MM/YY'),
      {}
    ),
    null
  );
});

test('dateBeforeToday validator returns error when inclusive is false and value is same as today', (t) => {
  t.is(
    runValidator(
      {
        type: DATE_BEFORE_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_BEFORE_TODAY_ERROR,
      },
      dayjs().format('MM/YY'),
      {}
    ),
    DATE_BEFORE_TODAY_ERROR
  );
});

test('dateAfterToday validator accepts when value is empty string', (t) => {
  t.is(validatorFns[DATE_AFTER_TODAY]('', ['MM/YY', 'month', true], {}), true);
});

test('dateAfterToday validator returns error when date is before today', (t) => {
  t.is(
    runValidator(
      {
        type: DATE_AFTER_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_AFTER_TODAY_ERROR,
      },
      dayjs().subtract(5, 'month').format('MM/YY'),
      {}
    ),
    DATE_AFTER_TODAY_ERROR
  );
});

test('dateAfterToday validator passes when inclusive is true and value is same as today', (t) => {
  t.is(
    runValidator(
      {
        type: DATE_AFTER_TODAY,
        args: ['MM/YY', 'month', true],
        error: DATE_AFTER_TODAY_ERROR,
      },
      dayjs().format('MM/YY')
    ),
    null
  );
});

test('dateAfterToday validator returns error when inclusive is false and value is same as today', (t) => {
  t.is(
    runValidator(
      {
        type: DATE_AFTER_TODAY,
        args: ['MM/YY', 'month', false],
        error: DATE_AFTER_TODAY_ERROR,
      },
      dayjs().format('MM/YY')
    ),
    DATE_AFTER_TODAY_ERROR
  );
});

test('isValidMonth validator throws error when start position resovles to NaN', (t) => {
  const validatorError = t.throws(() =>
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['a'],
        error: IS_VALID_MONTH_ERROR,
      },
      '01/02/22'
    )
  );
  t.is(
    validatorError.message,
    'Month start position has to be a valid integer string'
  );
});

test('isValidMonth validator fails when start position is greater than string length', (t) => {
  t.is(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['6'],
        error: IS_VALID_MONTH_ERROR,
      },
      '01/22'
    ),
    IS_VALID_MONTH_ERROR
  );
});

test('isValidMonth validator fails when month is less than 1', (t) => {
  t.is(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '00/22'
    ),
    IS_VALID_MONTH_ERROR
  );
});

test('isValidMonth validator fails when month is negative', (t) => {
  t.is(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '-2104'
    ),
    IS_VALID_MONTH_ERROR
  );
});

test('isValidMonth validator fails when month is greater than 12', (t) => {
  t.is(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '9821'
    ),
    IS_VALID_MONTH_ERROR
  );
});

test('isValidMonth validator passes with valid month', (t) => {
  t.is(
    runValidator(
      {
        type: IS_VALID_MONTH,
        args: ['0'],
        error: IS_VALID_MONTH_ERROR,
      },
      '1021'
    ),
    null
  );
});

test('hasLength validator accepts when value is empty string', (t) => {
  t.is(validatorFns[HAS_LENGTH]('', [1, 10], {}), true);
});

//TODO: Make prop test
test('hasLength validator returns error when validator rejects', (t) => {
  t.is(
    runValidator(
      { type: HAS_LENGTH, args: [1, 3], error: HAS_LENGTH_ERROR },
      '1234',
      {}
    ),
    HAS_LENGTH_ERROR
  );
});

test('hasLength throws error when max or min are not passed', (t) => {
  const validatorError = t.throws(() =>
    runValidator({ type: HAS_LENGTH, args: [1], error: HAS_LENGTH_ERROR }, '9', {})
  );
  t.is(
    validatorError.message,
    'Max and min need to be defined for hasLength, both or one of them is undefined'
  );
  const validatorError2 = t.throws(() =>
    runValidator({ type: HAS_LENGTH, args: [], error: HAS_LENGTH_ERROR }, '9', {})
  );
  t.is(
    validatorError2.message,
    'Max and min need to be defined for hasLength, both or one of them is undefined'
  );
});

test('hasLength throws error when max is less than min', (t) => {
  const validatorError = t.throws(() =>
    runValidator(
      { type: HAS_LENGTH, args: [10, 1], error: HAS_LENGTH_ERROR },
      '9',
      {}
    )
  );
  t.is(
    validatorError.message,
    'hasLength validator was passed a min greater than the max'
  );
});

test('hasNumber validator produces correct validator object', (t) => {
  t.is(hasNumber.error, HAS_NUMBER_ERROR);
  t.deepEqual(hasNumber(), {
    type: HAS_NUMBER,
    args: [],
    error: HAS_NUMBER_ERROR,
  });
});

test('hasNumber accepts when value is empty string', (t) => {
  t.is(validatorFns[HAS_NUMBER]('', ['doesntmatter'], {}), true);
});

testProp(
  'hasNumber rejects string with no numbers',
  [
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(!validatorFns[HAS_NUMBER](`${stringA.join('')}`, [], {}));
  }
);

testProp(
  'hasNumber accepts string with number',
  [
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(validatorFns[HAS_NUMBER](`${stringA.join('')}`, [], {}));
  }
);

test('hasLowercaseLetter validator produces correct validator object', (t) => {
  t.is(hasLowercaseLetter.error, HAS_LOWERCASE_LETTER_ERROR);
  t.deepEqual(hasLowercaseLetter(), {
    type: HAS_LOWERCASE_LETTER,
    args: [],
    error: HAS_LOWERCASE_LETTER_ERROR,
  });
});

test('hasLowercaseLetter accepts when value is empty string', (t) => {
  t.is(validatorFns[HAS_LOWERCASE_LETTER]('', ['doesntmatter'], {}), true);
});

testProp(
  'hasLowercaseLetter rejects string with with no lowercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(!validatorFns[HAS_LOWERCASE_LETTER](`${stringA.join('')}`, [], {}));
  }
);

testProp(
  'hasLowercaseLetter accepts string with with a lowercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(validatorFns[HAS_LOWERCASE_LETTER](`${stringA.join('')}`, [], {}));
  }
);

test('hasUppercaseLetter validator produces correct validator object', (t) => {
  t.is(hasUppercaseLetter.error, HAS_UPPERCASE_LETTER_ERROR);
  t.deepEqual(hasUppercaseLetter(), {
    type: HAS_UPPERCASE_LETTER,
    args: [],
    error: HAS_UPPERCASE_LETTER_ERROR,
  });
});

test('hasUppercaseLetter accepts when value is empty string', (t) => {
  t.is(validatorFns[HAS_UPPERCASE_LETTER]('', ['doesntmatter'], {}), true);
});

testProp(
  'hasUpperLetter rejects string with with no uppercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(!validatorFns[HAS_UPPERCASE_LETTER](`${stringA.join('')}`, [], {}));
  }
);

testProp(
  'hasUppercaseLetter accepts string with with a uppercase letter',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[A-Z]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(validatorFns[HAS_UPPERCASE_LETTER](`${stringA.join('')}`, [], {}));
  }
);

test('hasSpecialCharacter validator produces correct validator object', (t) => {
  t.is(hasSpecialCharacter.error, HAS_SPECIAL_CHARACTER_ERROR);
  t.deepEqual(hasSpecialCharacter(), {
    type: HAS_SPECIAL_CHARACTER,
    args: [],
    error: HAS_SPECIAL_CHARACTER_ERROR,
  });
});

test('hasSpecialCharacter accepts when value is empty string', (t) => {
  t.is(validatorFns[HAS_SPECIAL_CHARACTER]('', ['doesntmatter'], {}), true);
});

testProp(
  'hasSpecialCharacter rejects string with with no special character',
  [
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[a-z]/.test(c))).filter((s) => s !== ''),
    fc.stringOf(fc.char().filter((c) => /[0-9]/.test(c))).filter((s) => s !== ''),
  ],
  (t, ...stringA) => {
    t.true(!validatorFns[HAS_SPECIAL_CHARACTER](`${stringA.join('')}`, [], {}));
  }
);

testProp(
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
    t.true(validatorFns[HAS_SPECIAL_CHARACTER](`${stringA.join('')}`, [], {}));
  }
);

test('isPercentage accepts empty string', (t) => {
  t.is(validatorFns[IS_PERCENTAGE](''), true);
});
test('isPercentage accepts double digit decimals', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('23.52'), true);
});
test('isPercentage accepts whole numbers', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('5'), true);
});
test('isPercentage accepts tenths place values', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('1.0'), true);
});
test('isPercentage accepts hundredths place values', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('1.23'), true);
});
test('isPercentage does not accept alphabetical characters', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('abc'), false);
});
test('isPercentage does not accept beyond hundredths place values', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('1.238'), false);
});
test('isPercentage does not accept special characters', (t) => {
  t.is(validatorFns[IS_PERCENTAGE]('$1.00'), false);
});

test('isProbablyEmail validator produces correct validator object', (t) => {
  t.is(isProbablyEmail.error, IS_PROBABLY_EMAIL_ERROR);
  t.deepEqual(isProbablyEmail(), {
    type: IS_PROBABLY_EMAIL,
    args: [],
    error: IS_PROBABLY_EMAIL_ERROR,
  });
});

test('isProbablyEmail accepts when value is empty string', (t) => {
  t.is(validatorFns[IS_PROBABLY_EMAIL]('', ['doesntmatter'], {}), true);
});

const testRegexEmailString = /^\S+@\S+\.\S+$/;

testProp(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when passing regex test for isProbablyEmail',
  [fc.string(1, 15).filter((str) => new RegExp(testRegexEmailString).test(str))],
  (t, valueThatMatchesRegex) => {
    t.true(
      validatorFns[IS_PROBABLY_EMAIL](
        valueThatMatchesRegex,
        [testRegexEmailString],
        {}
      )
    );
  }
);

testProp(
  'regex string passed to matchesRegex matches test result of vanilla JS regex when failing regex test for isProbablyEmail',
  [fc.string(1, 15).filter((str) => !new RegExp(testRegexEmailString).test(str))],
  (t, valueThatDoesNotMatchRegex) => {
    t.true(
      !validatorFns[IS_PROBABLY_EMAIL](
        valueThatDoesNotMatchRegex,
        [testRegexEmailString],
        {}
      )
    );
  }
);
