import { sum } from '../../js/december.js';

function bitsToInt(bits) {
  return parseInt(bits, 2);
}

function parse(puzzle) {
  return puzzle.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');
}

function readPackets(bitStr) {
  const packets = [];

  while (bitStr.length > 7) {
    const [packet, rest] = readPacket(bitStr);
    bitStr = rest;
    packets.push(packet);
  }
  return packets
}

function readPacket(bitStr) {
  if (bitStr.length < 7) return null;
  const version = bitsToInt(bitStr.slice(0, 3));
  const type = bitsToInt(bitStr.slice(3, 6));
  let rest = bitStr.slice(6);
  

  if (type === 4) {
    const [num, newRest] = parseNum(rest);
    rest = newRest;
    packet.num = num;
  } else {
    const lengthTypeId = rest[0];

    if (lengthTypeId === 0) {
      const length = bitsToInt(rest.slice(1, 16));
      const newRest = rest.slice(16, 16 + length);

      rest = newRest;
      readPackets(newRest, packet);
    } else {
      const length = bitsToInt(rest.slice(1, 12));
      const newRest = rest.slice(12, 12 + 11 * length)
    }
  }

  const packet = { type, version };
  return [packet, rest];
}

function parseNum(str, count = 0) {
  const part = str.slice(0, 5);
  let rest = part.slice(1);
  count += bitsToInt(part.slice(1));

  if (part[0] === '1') {
    const [extraCount, newRest] = parseNum(str.slice(5), count);
    count += extraCount;
    rest = newRest;
  }
  return [count, rest];
}

export default {
  title: 'Packet Decoder',
  questions: ['Decode the structure of your hexadecimal-encoded BITS transmission; what do you get if you add up the version numbers in all packets?', ''],
  answer1: (puzzle) => {
    const bitStr = parse(puzzle);
    const packets = readPackets(bitStr);
    return packets.map(x => x.version).reduce(sum);
  },
  answer2: (puzzle) => { },
  example: [
    {
      input: `D2FE28`,
      solutions: [6],
    },
    // 38006F45291200 - 1
    // EE00D40C823060 - 7
    // 
    {
      input: `8A004A801A8002F478`,
      solutions: [16],
    },
    {
      input: `620080001611562C8802118E34`,
      solutions: [12],
    },
    {
      input: `C0015000016115A2E0802F182340`,
      solutions: [23],
    },
    {
      input: `A0016C880162017C3686B18A3D4780`,
      solutions: [31],
    },
  ],
  solutions: [],
};
