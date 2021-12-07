#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void iterate_day(unsigned long long int fish[]) {
  unsigned long long int temp1 = fish[8];
  unsigned long long int temp2;
  int i;

  for (i = 7; i >= 0; i--) {
    temp2 = fish[i];
    fish[i] = temp1;
    temp1 = temp2;
  }

  fish[8] = temp1;
  fish[6] = fish[6] + temp1;
}

unsigned long long int sum_fish(unsigned long long int fish[]) {
  unsigned long long int sum = 0;
  int i;

  for (i = 0; i < 9; i++) {
    sum += fish[i];
  }

  return sum;
}

int main() {
  FILE *fp = fopen("data.txt", "r");
  unsigned long long int fish[9] = {0};
  int i;
  int curr;
  char c[2];

  c[1] = '\0';

  if (fp == NULL) {
    printf("Error opening file.");
    return 0;
  }

  do {
    c[0] = fgetc(fp);

    if (c[0] != ',' && c[0] != -1) {
      curr = atoi(c);
      if (curr < 9 && curr > -1) {
        fish[curr] = fish[curr] + 1;
      }
    }
  } while (feof(fp) == 0);

  printf("Original fish count: %llu\n", sum_fish(fish));

  for (i = 0; i < 256; i++) {
    iterate_day(fish);
    // printf("Day %i: %i fish.\n", i, sum_fish(fish));
    if (i == 79) {
      printf("Fish count after 80 days: %llu\n", sum_fish(fish));
    }
    if (i == 255) {
      printf("Fish count after 256 days: %llu\n", sum_fish(fish));
    }
    // if (i % 10 == 0) {
    //   printf("Fish counts after %i days: %llu + %llu + %llu + %llu + %llu + %llu + %llu + %llu + %llu\n", i, fish[0], fish[1], fish[2], fish[3], fish[4], fish[5], fish[6], fish[7], fish[8]);
    // }
  }
}
