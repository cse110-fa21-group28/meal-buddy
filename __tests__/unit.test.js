const {getTitle} = require('../public/components/functions.js');
const {getImage} = require('../public/components/functions.js');
const {searchForKey} = require('../public/components/functions.js');

// __________________________ getTitle __________________________
test('Testing getTitle(data) function', () => {
    expect(getTitle({'name':'hello'})).toBe('hello');
    expect(getTitle({'school':'ucsd', 'name':'hello'})).toBe('hello');
    expect(getTitle({'school':'ucsd'})).toBe(null);
});

// __________________________ getImage __________________________
test('Testing getImage(data) function', () => {
    expect(getImage({'image_url':'theUrl'})).toBe('theUrl');
    expect(getImage({'name':'title','image_url':'theUrl'})).toBe('theUrl');
    expect(getImage({'name':'title'})).toBe(null);
});

// ________________________ searchForKey _________________________
test('Testing searchForKey(data) function', () => {
    expect(searchForKey({'firstName':'farnia','lastName':'nafarifard','school':'ucsd'}, 'lastName')).toBe('nafarifard');
    expect(searchForKey({'school':'ucsd'}, 'name')).toBe(undefined);
});