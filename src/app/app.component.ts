import { Component } from '@angular/core';
import { GivenNames, LastNames } from '../assets/pre-1930-baseball-names.json';
import { Bios } from '../assets/bios.json';
import { Locations, Mascots } from '../assets/team-names.json';
import * as ColorScheme from 'color-scheme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'baseball-heroes';
  stats = ['k', 'bb', 'go', 'fb', 'sb', 'fo', 'hr', 'tb'];
  bounds = {
    pitcher: {
      k: {
        min: 10,
        max: 40,
      },
      bb: {
        min: 3,
        max: 15,
      },
      go: {
        min: 13,
        max: 39,
      },
      fb: {
        min: 6,
        max: 15,
      },
      sb: {
        min: 1,
        max: 5,
      },
      fo: {
        min: 12,
        max: 40,
      },
      hr: {
        min: 0,
        max: 3,
      },
      tb: {
        min: 0,
        max: 1,
      },
    },
    batter: {
      k: {
        min: 3,
        max: 18,
      },
      bb: {
        min: 3,
        max: 18,
      },
      go: {
        min: 13,
        max: 39,
      },
      fb: {
        min: 10,
        max: 25,
      },
      sb: {
        min: 3,
        max: 8,
      },
      fo: {
        min: 12,
        max: 36,
      },
      hr: {
        min: 0,
        max: 8,
      },
      tb: {
        min: 0,
        max: 3,
      },
    },
  };
  positions = [
    'C',
    '1B',
    '2B',
    '3B',
    'SS',
    'IF',
    'LF',
    'CF',
    'RF',
    'OF',
    'SP',
    'MR',
    'CL',
  ];
  teamRecipe = [
    {
      count: 1,
      position: ['C'],
    },
    {
      count: 1,
      position: ['1B', 'IF'],
    },
    {
      count: 1,
      position: ['2B', 'IF'],
    },
    {
      count: 1,
      position: ['3B', 'IF'],
    },
    {
      count: 1,
      position: ['SS', 'IF'],
    },
    {
      count: 1,
      position: ['LF', 'OF'],
    },
    {
      count: 1,
      position: ['CF', 'OF'],
    },
    {
      count: 1,
      position: ['RF', 'OF'],
    },
    {
      count: 5,
      position: ['SP'],
    },
    {
      count: 5,
      position: ['MR'],
    },
    {
      count: 1,
      position: ['MR', 'CL'],
    },
    {
      count: 6,
      position: ['C', '1B', '2B', '3B', 'SS', 'IF', 'LF', 'CF', 'RF', 'OF'],
    },
  ];

  players = [];
  totalBa: number;
  avgBa: number;
  totalBaa: number;
  avgBaa: number;
  total: number;
  avg: number;
  colors: string[] = [];
  ratio: number;

  constructor() {
    const scheme = new ColorScheme();
    const hue = Math.floor(Math.random() * 360);
    this.colors = [
      ...this.colors,
      ...scheme.from_hue(hue).scheme('contrast').variation('default').colors(),
    ];

    for (const player of this.teamRecipe) {
      for (let i = 0; i < player.count; i++) {
        const team = `${
          Locations[Math.floor(Math.random() * Locations.length)]
        } ${Mascots[Math.floor(Math.random() * Mascots.length)]}`;
        this.players.push(
          this.generatePlayer(
            player.position[Math.floor(Math.random() * player.position.length)],
            team
          )
        );
      }
    }
    this.totalBa = this.players
      .map((player) => player.ba)
      .reduce((accumulator, ba) => (accumulator += ba));
    this.avgBa = this.players
      .map((player) => player.ba)
      .reduce((accumulator, ba) => {
        if (ba) {
          return (accumulator + ba) / 2;
        } else {
          return accumulator;
        }
      });
    this.totalBaa = this.players
      .map((player) => player.baa)
      .reduce((accumulator, baa) => (accumulator += baa));
    this.avgBaa = this.players
      .map((player) => player.baa)
      .reduce((accumulator, baa) => {
        if (baa) {
          return (accumulator + baa) / 2;
        } else {
          return accumulator;
        }
      });
    this.total = this.totalBa + this.totalBaa;
    this.avg = (this.avgBa + this.avgBaa) / 2;
    const getGcd = (a: number, b: number) => (b ? getGcd(b, a % b) : a);
    const gcd = getGcd(
      Math.round(this.avgBa * 100),
      Math.round(this.avgBaa * 100)
    );
    this.ratio = this.avgBa / this.avgBaa;
    console.log(this.ratio);
  }

  generatePlayer(position: string, team: string) {
    const player = {
      type:
        position === 'SP' || position === 'MR' || position === 'CL'
          ? 'pitcher'
          : 'batter',
      position,
      stats: {
        k: 0,
        bb: 0,
        go: 0,
        fb: 0,
        sb: 0,
        fo: 0,
        hr: 0,
        tb: 0,
      },
      offsets: {},
      total: 0,
      name: `${GivenNames[Math.floor(Math.random() * GivenNames.length)]} ${
        LastNames[Math.floor(Math.random() * LastNames.length)]
      }`,
      bio: Bios[Math.floor(Math.random() * Bios.length)],
      team,
      speed: Math.floor(Math.random() * 26),
      speedSign: Math.floor(Math.random() * 2) ? '+' : '-',
      arm: Math.floor(Math.random() * 43) + 36,
      innings: 1,
      ba: 0,
      baa: 0,
      erc: 0,
    };

    if (position === 'SP') {
      player.innings = Math.floor(Math.random() * 3) + 5;
    }
    if (position === 'MR') {
      player.innings = Math.floor(Math.random() * 2) + 1;
    }

    for (const stat of this.stats) {
      if (this.bounds[player.type][stat]) {
        player.stats[stat] = this.bounds[player.type][stat].min;
        player.total += player.stats[stat];
      }
    }
    while (player.total < 100) {
      const stat = this.stats[Math.floor(Math.random() * this.stats.length)];
      if (player.stats[stat] < this.bounds[player.type][stat].max) {
        const remaining =
          this.bounds[player.type][stat].max + 1 - player.stats[stat];
        const add = Math.floor(
          Math.random() *
            (remaining < 101 - player.total ? remaining : 101 - player.total)
        );
        player.stats[stat] += add;
        player.total += add;
      }
    }
    if (player.type === 'batter') {
      player.ba =
        (player.stats.fb +
          player.stats.sb +
          player.stats.hr +
          player.stats.tb) /
        (100 - player.stats.bb);
    } else {
      const ptb =
        0.89 *
          (1.255 * (player.stats.fb + player.stats.sb + player.stats.tb) +
            4 * player.stats.hr) +
        0.475 * player.stats.bb;
      const ip = (player.stats.fo + player.stats.go + player.stats.k) / 3;
      player.erc =
        9 *
          (((player.stats.fb +
            player.stats.sb +
            player.stats.tb +
            player.stats.hr +
            player.stats.bb) *
            ptb) /
            (100 * ip)) -
        0.56;
      if (player.erc < 2.24) {
        player.erc =
          9 *
          (((player.stats.fb +
            player.stats.sb +
            player.stats.tb +
            player.stats.hr +
            player.stats.bb) *
            ptb) /
            (100 * ip)) *
          0.75;
      }
      player.baa =
        (player.stats.fb +
          player.stats.sb +
          player.stats.tb +
          player.stats.hr) /
        (100 - player.stats.bb);
    }
    let min = 0;
    for (const stat in player.stats) {
      if (player.stats[stat]) {
        player.offsets[stat] = {};
        if (player.stats[stat] > 0) {
          min++;
        }
        player.offsets[stat].min = min;
        if (player.stats[stat] > 0) {
          min += player.stats[stat] - 1;
        }
        player.offsets[stat].max = min;
        if (player.offsets[stat].min === 100) {
          player.offsets[stat].min = '00';
        }
        if (player.offsets[stat].max === 100) {
          player.offsets[stat].max = '00';
        }
      }
    }
    return player;
  }
}
