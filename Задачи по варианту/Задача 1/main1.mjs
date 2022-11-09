function quickSort (arr, left = 0, right = arr.length - 1) {
  if (arr.length > 1) {
    const position = partition(arr, left, right)
    if (left < position - 1) quickSort(arr, left, position - 1)
    if (position < right) quickSort(arr, position, right)
  }
  return arr
}

function partition (arr, left, right) {
  const pivot = arr[Math.floor(Math.random() * (right - left + 1) + left)]

  while (left <= right) {
    while (arr[left] < pivot) {
      left += 1
    }
    while (arr[right] > pivot) {
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

import { readFile, writeFile } from 'fs'

readFile('./input.txt', 'utf8', (err, data) => {
  const input = data.match(/[^\r\n]+/g)
  const output = quickSort(input[1].split(' ').map(Number))
  writeFile('./output.txt', output.join(' '), () => {})
})
