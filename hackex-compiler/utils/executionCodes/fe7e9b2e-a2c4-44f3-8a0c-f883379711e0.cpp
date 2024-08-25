#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    int x; cin>>x;
  vector<int>a(x);
  for(auto &v : a) cin>>v;
  int s = 0;
  for(auto i : a) s += i;
  cout<<s;
    return 0;
}