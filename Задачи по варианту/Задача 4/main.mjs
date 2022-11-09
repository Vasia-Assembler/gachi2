function quickSort (arr, left = 0, right = arr.length - 1, predicate) {
  if (arr.length > 1) {
    const position = partition(arr, left, right, predicate)
    if (left < position - 1) quickSort(arr, left, position - 1, predicate)
    if (position < right) quickSort(arr, position, right, predicate)
  }
  return arr
}

function partition (arr, left, right, predicate) {
  const pivot = arr[Math.floor(Math.random() * (right - left + 1) + left)]
  // console.log(arr, left, right, pivot)
  while (left <= right) {
    // while (arr[left] < pivot) {
    while (!predicate(arr[left], pivot)) {
      left += 1
    }
    //while (arr[right] > pivot) {
    while (predicate(arr[right], pivot)) {
      right -= 1
    }
    if (left <= right) {
      swap(arr, left, right)
      left += 1
      right -= 1
    }
  }
  return left
}

function swap (arr, left, right) {
  const temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

function findPoints(segments, points) {
  //return points.map((p) => segments.filter((s) => s[0] <= p && s[1] >= p).length)
  const sorted = quickSort(segments, undefined, undefined, (a, b) => {
    if (a === undefined) return true
    if (b == undefined) return false
    return a[0] > b[0] && a[1] > b[1]
  })
  return points.map((p) => {
    const first = sorted[0]
    const last = sorted[sorted.length - 1]
    if (first[0] > p) return 0
    if (last[1] < p) return 0
    const i = sorted.findIndex((value) => value[0] <= p && value[1] >= p)
    if (i === -1) return 0
    const workslice = sorted.slice(i, sorted.length)
    return workslice.filter((value) => value[0] <= p && value[1] >= p).length
  })
}

import { readFile, writeFile } from 'fs'

readFile('./input.txt', 'utf8', (err, data) => {
  const input = data.match(/[^\r\n]+/g)
  const segments = input.slice(1, input.length - 1).map((x) => {
    const s = x.split(' ')
    return [Number(s[0]), Number(s[1])]
  })
  const points = input[input.length - 1].split(' ').map(Number)
  const result = findPoints(segments, points)
  console.log(result.join(' '))
})
