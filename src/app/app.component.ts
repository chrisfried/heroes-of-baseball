import { Component } from '@angular/core';
import { GivenNames, LastNames } from '../assets/pre-1930-baseball-names.json';
import { Bios } from '../assets/bios.json';
import { Locations, Mascots } from '../assets/team-names.json';

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

  constructor() {
    for (const player of this.teamRecipe) {
      for (let i = 0; i < player.count; i++) {
        this.players.push(
          this.generatePlayer(
            player.position[Math.floor(Math.random() * player.position.length)]
          )
        );
      }
    }
  }

  generatePlayer(position: string) {
    const type =
      position === 'SP' || position === 'MR' || position === 'CL'
        ? 'pitcher'
        : 'batter';
    const player = {
      position,
      stats: {},
      offsets: {},
      total: 0,
      name: '',
      bio: Bios[Math.floor(Math.random() * Bios.length)],
      team:
        Locations[Math.floor(Math.random() * Locations.length)] +
        ' ' +
        Mascots[Math.floor(Math.random() * Mascots.length)],
      speed: Math.floor(Math.random() * 26),
      speedSign: Math.floor(Math.random() * 2) ? '+' : '-',
      arm: Math.floor(Math.random() * 43) + 36,
      innings: 1,
    };

    const givenNameCount = Math.floor(Math.random() * 2);
    player.name +=
      GivenNames[Math.floor(Math.random() * GivenNames.length)] + ' ';
    if (givenNameCount) {
      player.name +=
        GivenNames[Math.floor(Math.random() * GivenNames.length)] + ' ';
    }
    player.name += LastNames[Math.floor(Math.random() * LastNames.length)];

    if (position === 'SP') {
      player.innings = Math.floor(Math.random() * 3) + 5;
    }
    if (position === 'MR') {
      player.innings = Math.floor(Math.random() * 2) + 1;
    }

    for (const stat of this.stats) {
      if (this.bounds[type][stat]) {
        player.stats[stat] = this.bounds[type][stat].min;
        player.total += player.stats[stat];
      }
    }
    while (player.total < 100) {
      const stat = this.stats[Math.floor(Math.random() * this.stats.length)];
      console.log(stat, player.stats[stat]);
      if (player.stats[stat] < this.bounds[type][stat].max) {
        const remaining = this.bounds[type][stat].max + 1 - player.stats[stat];
        const add = Math.floor(
          Math.random() *
            (remaining < 101 - player.total ? remaining : 101 - player.total)
        );
        console.log(
          'stat',
          stat,
          'min',
          this.bounds[type][stat].min,
          'max',
          this.bounds[type][stat].max,
          'current',
          player.stats[stat],
          'add',
          add,
          'total',
          player.total
        );
        player.stats[stat] += add;
        player.total += add;
      }
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
      }
    }
    return player;
  }
}
