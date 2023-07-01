import createJestConfig from 'next/jest';

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

const jestConfig = createJestConfig({ dir: './' })(customJestConfig);

export default jestConfig;
