function mergeSort (arr, predicate) {
  if (arr.length === 1) {
    return arr
  }
  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(
    mergeSort(left, predicate),
    mergeSort(right, predicate),
    predicate
  )
}


function merge (left, right, predicate) {
  const result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (predicate(left[indexLeft], right[indexRight])) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

function transpose(x) {
  const arr = []
  for (const [k] of Object.entries(x[0])) {
    arr[k] = ''
    for (let i = 0; i < x.length; i += 1) {
      arr[k] += x[i][k]
    }
  }
  return arr
}

function compare(a, b, ai, bi) {
  if (a === undefined) return true
  if (b === undefined) return false
  if (a !== b) {
    for (const [k, v] of Object.entries(a)) {
      const bv = b[k]
      if (bv === undefined) return 1
      if (v === bv) continue
      return v < bv
    }
    return true
  }
  return ai < bi
}

function sort(arr, k) {
  const x = transpose(arr)
  const b = mergeSort(x.map((e, i) => [e, i + 1]), (a, b) => {
    if (a === undefined) return true
    if (a === b) return false
    const index = a[0].length - k
    const copy_a = a[0].slice(index)
    const copy_b = b[0].slice(index)
    return compare(copy_a, copy_b, a[1], b[1])
  })
  return b.map((w) => x.indexOf(w[0]) + 1)
}

import { readFile, writeFile } from 'fs'

readFile('./input.txt', 'utf8', (err, data) => {
  const input = data.match(/[^\r\n]+/g)
  const [n, m, k] = input[0].split(' ').map(Number)
  const x = input.slice(1, input.length)
  const output = sort(x, k)
  writeFile('./output.txt', output.join(' '), () => {})
})