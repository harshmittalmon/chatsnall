#include <bits/stdc++.h>
using namespace std;
#define vectinp(v){for(auto&i:v){cin>> i;}}
#define PrintVec(v){for(auto&i:v){cout<< i<<" ";}cout<< endl;}
#define vi vector<int> 
#define vll vector<long long>
#define vpii vector<pair<int,int>> 
#define vpll vector<pair<long long ,long long >>
#define mpll map<long long,long long>
#define umpll unordered_map<long long ,long long>
#define mapii map<int,int> 
#define u_mapii unordered_map<int,int> 
#define ll long long
#define itc int t; \
            cin>> t;\
            while(t--)

#define yes cout << "Yes\n"
#define no cout << "No\n"
#define all(v) v.begin(),v.end()
#define sz(x) (int)(x.size())
#include <ext/pb_ds/assoc_container.hpp> 
#include <ext/pb_ds/tree_policy.hpp> 
using namespace __gnu_pbds; 
  
#define ordered_set tree<ll, null_type,less<ll>, rb_tree_tag,tree_order_statistics_node_update> 
  

// -----------string stream usage---------------------------------------------------------------------------------------------
string removeSpaces(string str)
{
    // Storing the whole string into string stream
    stringstream ss(str);
    string temp;
    str = "";
    while (getline(ss, temp, ' ')) { 
        str = str + temp ;
    }
    return str;
}

//-----------------string storing integer to array storing those values--------------------------------------------------------------
void integer_string_to_arr(string& s,vector<int> & v){
  int j=0;
  for(char i : s){
       string temp="" ;temp.push_back(i);
       int num = stoi(temp);
       v[j++]=num;
  }
}



void solve(){
    int s,k,m;cin>>s>>k>>m;
    if( k >  s){
        m = m % 2*k;
        if( m <= k ){
            cout << s - m << endl;
        }
        else {
            cout << s - k - m <<endl; 
        }
    }
    else if( k ==  s){
        m = m % k ; 
        cout << max(m-k,k-m)<<endl;
    }
    else{
        m = m % k ; 
        if( m >= s ) {
            cout << 0 <<endl;

        }
        else {
            cout << s - m <<endl;
        }
    }
}
int main(){
    itc{
        solve();
    }
}