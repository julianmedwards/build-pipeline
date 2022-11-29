'use strict'

import 'mocha'
import {expect} from 'chai'

describe('Tests', function () {
    describe('example test 1', function () {
        it('should fail', function () {
            let num = 1
            expect(num).to.equal(2)
        })
    })
    describe('example test 2', function () {
        it('should succeed', function () {
            let num = 2
            expect(num).to.equal(2)
        })
    })
})
