
import test from 'ava';

import Tournament from './tournament';
import {
  PLAYER_A,
  PLAYER_B,
  PLAYER_C,
  PLAYER_D,
  PLAYER_E,
  PLAYER_F,
  PLAYERS
} from '../../test-data';

const TOURNAMENT_SIZE = 4;

test.beforeEach(t => {
  t.context.tournament = new Tournament({
    tournamentSize: TOURNAMENT_SIZE
  });
});

test('returns the element if there is only one', t => {
  let result = t.context.tournament.tourney([PLAYER_A]);

  t.is(result, PLAYER_A);
});

test('returns the highest scored player between two players', t => {  
  let result = t.context.tournament.tourney([PLAYER_C, PLAYER_A]);
  
  t.is(result, PLAYER_C);
});

test('returns the highest scored player between three players', t => {  
  let result = t.context.tournament.tourney([PLAYER_C, PLAYER_A, PLAYER_B]);
  
  t.is(result, PLAYER_C);
});

test('returns the highest scored player when there are less than enough players', t => {  
  let result = t.context.tournament.tourney([PLAYER_C, PLAYER_A]);
  
  t.is(result, PLAYER_C);
});

test('runs a tourney with the correct size', t => {
  const PICK = 2;
  let pickCount = 0;
  t.context.tournament.tourney = function (players) {
    t.is(players.length, TOURNAMENT_SIZE);
    pickCount++;
    return {};
  }

  t.context.tournament.select(PLAYERS, PICK);

  t.is(pickCount, PICK);
});