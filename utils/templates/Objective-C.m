#import <stdio.h>
#import <Foundation/Foundation.h>

@interface diff: NSObject
- (long long) abs:(long long) x;
@end

@implementation diff
- (long long) abs:(long long) x {
  return x > 0 ? x : -x;
}
@end

int main() {
  diff *Different = [diff new];
  long long a, b;
    while (scanf("%lld%lld", &a, &b) == 2)
      printf("%lld\n", [Different abs:(a-b)]);
  [Different release];
  return 0;
}
