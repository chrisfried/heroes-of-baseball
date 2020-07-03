import { Component } from '@angular/core';

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

  players = [];

  constructor() {
    let count = 0;
    while (count < 18) {
      const coin = Math.floor(Math.random() * 2);
      this.players.push(this.generatePlayer(coin ? 'pitcher' : 'batter'));
      count++;
    }
  }

  generatePlayer(type: 'pitcher' | 'batter') {
    const player = {
      type,
      stats: {},
      offsets: {},
      total: 0,
    };
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
        const remaining = this.bounds[type][stat].max - player.stats[stat];
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
