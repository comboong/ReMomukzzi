import _ from 'lodash';

export default function useShuffledArray(arr, n) {
  let newArr = _.shuffle(arr.filter((_, i) => i !== n));

  return newArr;
}
